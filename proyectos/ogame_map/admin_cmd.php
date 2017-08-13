#!/usr/bin/php
<?php

return; // Para evitar la ejecucion online

// Rastrea un universo dado con una sesion entre dos ubicaciones
// La sesion es un identificador que se encuentra en la direccion de todas las peticiones al servidor
// de juego, por ejemplo el enlace de "Vision General" es http://ogame301.de/game/overview.php?session=3e5fe9313797
// donde el parametro seria el identificador de sesion necesario. El identificador de sesion se inutiliza al 
// finalizarla
if ($argc != 7){
	print("Uso: $argv[0] <session> <universo> <galaxia1> <galaxia2> <sistema1> <sistema2>\n");
	exit();
}

require_once("include/config.php");
require_once("include/functions.php");
require_once('include/db_mysql.php');

$db = new DB_Sql();
$db->db_connect($db_url);

	$session = $argv[1];
	$universo = $argv[2];
	$galaxia1 = $argv[3];
	$galaxia2 = $argv[4];
	$sistema1 = $argv[5];
	$sistema2 = $argv[6];

	// IMPORTANTE: Es obligatorio cambiar el "user agent" por el del navegador desde el que se inicio la sesion
	$USER_AGENT = "Opera/9.00 (X11; Linux i686; U; en)";

        $servidor = $db->db_query("SELECT servidor FROM universos WHERE numero=".$universo, true);
        $servidor = $servidor[0]["servidor"];

	print("Rastreando en el universo $universo($servidor) con la sesion $session entre las galaxias $galaxia1-$galaxia2 y los sistemas $sistema1-$sistema2\n");

	$galaxias = range($galaxia1, $galaxia2);
	srand((float)microtime() * 1000000);
	shuffle($galaxias);

	foreach($galaxias as $galaxy){

		$sistemas = range($sistema1, $sistema2);
		srand((float)microtime() * 1000000);
		shuffle($sistemas);

		foreach($sistemas as $system){
//			$startTime = array_sum(explode(" ",microtime()));

			print("[$galaxy:$system]\n");

			$post_data = "session=$session&galaxy=$galaxy&system=$system";
			$url = "http://$servidor/game/galaxy.php?session=$session";
			$opts = array(
			        'http' => array(
			                'method' => 'POST',
					'header' => 	"Content-Type: application/x-www-form-urlencoded\r\n".
							"User-Agent: $USER_AGENT\r\n".
							"Referer: $url\r\n".
							"Content-Length: ".strlen($post_data),
		                	'content' => $post_data
		        	)
			);
			$contextResource = stream_context_create($opts);
			$handle = fopen($url, 'r', false, $contextResource);
//			$handle = fopen("doc/galaxy.htm", "r");
			$contents = '';
			if($handle){
				stream_set_timeout($handle, 20);
				while (!feof($handle)) {
					$contents .= fread($handle, 8192);
				}
				fclose($handle);
			}

			preg_match_all("/<(tr)[^>]*>(.*?)<\/\\1>/si", $contents, $out_tr);

			if (empty($out_tr[0])){
				print("[ERROR] Sesion no valida!\n");
				break; break;
			}

			foreach($out_tr[0] as $tr){
				preg_match_all("/<(th)[^>]*>(.*?)<\/\\1>/si", $tr, $out_th);
				if (sizeof($out_th[0]) == 8){
					$datos["galaxia"] = $galaxy;
					$datos["sistema"] = $system;
	
					// Columnas
					// out_th[0][0]: Numero de Planeta
					// out_th[0][1]: Planeta
					// out_th[0][2]: Nombre del planeta
					// out_th[0][3]: Luna
					// out_th[0][4]: Escombros
					// out_th[0][5]: Nombre del jugador
					// out_th[0][6]: Alianza
					// out_th[0][7]: Acciones

					// Numero de planeta
					preg_match("/<a[^>]*>(.*?)<\/a>/si", $out_th[0][0], $planeta_num); 
					$datos["planeta"] = trim($planeta_num[1]);

					// Nombre del planeta
					preg_match("/<th[^>]*>(.*?)<\/th>/si", $out_th[0][2], $planeta_nombre); 
					$planeta_nombre = split("&", $planeta_nombre[1]); 
					$datos["planeta_nombre"] = trim($planeta_nombre[0]);

					// Tamanyo de la luna
					preg_match("/M Tama[^\ ]*([^\"]*)/si", $out_th[0][3], $luna); 
					$datos["luna"] = trim($luna[1]);

					// Jugador
					preg_match("/&u=(.*?)\\\/si", $out_th[0][5], $jugador_id);
					preg_match("/<span[^>]*>(.*?)<\/span>/si", $out_th[0][5], $jugador_nombre); 
					preg_match("/Jugador (.*?) en el ranking (.*?)&/si", $out_th[0][5], $jugador_info); 
					// jugador_info[1]: Nombre del jugador
					// jugador_info[2]: Posicion en el ranking

					// Estado del jugador:
					// f: fuerte
					// d: debil
					// i: inactivo
					// I: muy inactivo
					// s: suspendido
					// v: vacaciones
					preg_match("/\((<.*?>)\)/si", $out_th[0][5], $jugador_estado); 
					preg_match("/<span class='inactive'>(.*?)<\/span>/si", $jugador_estado[1], $jugador_inactivo);
					preg_match("/<span class='longinactive'>(.*?)<\/span>/si", $jugador_estado[1], $jugador_muy_inactivo);
					preg_match("/<span class='vacation'>(.*?)<\/span>/si", $jugador_estado[1], $jugador_vacaciones);
					preg_match("/<span class='banned'>(.*?)<\/span>/si", $jugador_estado[1], $jugador_suspendido);
				
					$jugador["id"] = trim($jugador_id[1]);
					$jugador["nombre"] = trim($jugador_nombre[1]);
					$jugador["ranking"] = trim($jugador_info[2]);
					$jugador["inactivo"] = trim($jugador_inactivo[1]) != "" ? "1" : "0";
					$jugador["muy_inactivo"] = trim($jugador_muy_inactivo[1]) != "" ? "1" : "0";
					$jugador["vacaciones"] = trim($jugador_vacaciones[1]) != "" ? "1" : "0";
					$jugador["suspendido"] = trim($jugador_suspendido[1]) != "" ? "1" : "0";
					$datos["jugador"] = $jugador;
				
					// Nombre de la alianza
					preg_match("/<a[^>]*>(.*?)<\/a>/si", $out_th[0][6], $alianza_nombre); 
					if (strpos($alianza_nombre[1], 'span') !== false){
						preg_match("/<span[^>]*>(.*?)<\/span>/si", $alianza_nombre[1], $alianza_nombre); 
					}
					preg_match("/\?a=(.*?)\\\/si", $out_th[0][6], $alianza_id);
					preg_match("/url=(.*?)\\\/si", $out_th[0][6], $alianza_url);
					preg_match("/Alianza (.*?) en la posición (.*?) con (.*?) Miembro/si", $out_th[0][6], $alianza_info);
					// alianza_info[1]: Nombre de la alianza
					// alianza_info[2]: Posicion en ranking
					// alianza_info[3]: Numero de miembros

					$alianza["id"] = trim($alianza_id[1]);
					$alianza["nombre"] = trim($alianza_nombre[1]);
					$alianza["posicion"] = trim($alianza_info[2]);
					$alianza["miembros"] = trim($alianza_info[3]);
					$alianza["url"] = trim($alianza_url[1]);
					$datos["jugador"]["alianza"] = $alianza;

					if ($datos["jugador"]["id"] != ""){
						$db->db_query("REPLACE INTO uni$universo (galaxia, sistema, planeta, nombre_planeta, luna, jugador) VALUES (
							\"".$datos['galaxia']."\", 
							\"".$datos['sistema']."\", 
							\"".$datos['planeta']."\", 
							\"".$datos['planeta_nombre']."\", 
							\"".$datos['luna']."\", 
							\"".$datos['jugador']["id"]."\"
							)", false);
						$db->db_query("REPLACE INTO uni".$universo."_jugadores VALUES (
							\"".$datos['jugador']["id"]."\", 
							\"".$datos['jugador']["nombre"]."\",
							\"".$datos["jugador"]["ranking"]."\",
							\"".$datos["jugador"]['alianza']["id"]."\",
							\"".$datos["jugador"]["inactivo"]."\",
							\"".$datos["jugador"]["muy_inactivo"]."\",
							\"".$datos["jugador"]["vacaciones"]."\",
							\"".$datos["jugador"]["suspendido"]."\"
							)", false);
						if ($datos["jugador"]["alianza"]["id"] != ""){
							$db->db_query("REPLACE INTO uni".$universo."_alianzas VALUES (
								\"".$datos["jugador"]["alianza"]["id"]."\", 
								\"".$datos["jugador"]["alianza"]["nombre"]."\", 
								\"".$datos["jugador"]["alianza"]["posicion"]."\",
								\"".$datos["jugador"]["alianza"]["miembros"]."\",
								\"".$datos["jugador"]["alianza"]["url"]."\"
								)", false);
						}
					}
				}
			}
		
			sleep(2);
//			print(round((array_sum(explode(" ",microtime())) - $startTime),4)." sec\n");
		}
	}
