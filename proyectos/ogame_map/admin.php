<?php
session_start();

require_once("include/config.php");
require_once("include/functions.php");
require_once('include/db_mysql.php');

$db = new DB_Sql();
$db->db_connect($db_url);

foreach($_REQUEST as $key => $value){
	$_SESSION[$key] = $value;
}
	
check_range($_SESSION["galaxia1"], $_SESSION["galaxia2"], 1, 9);
check_range($_SESSION["sistema1"], $_SESSION["sistema2"], 1, 499);

?>

<html>
	<head>
		<title>Cartografia - Admin</title>
                <link rel="stylesheet" href="css/style.css" type="text/css">
                <link rel="stylesheet" href="css/skin.css" type="text/css">
                <script language="JavaScript" src="js/functions.js"></script>
	</head>
	<body>
		<form name="actualizar" action="<?php echo $_SERVER["PHP_SELF"]; ?>" method="POST">
                        <table cellpadding="1" cellspacing="0" border="0" align="center" width="95%">
                                <tr><td>
                                        <table class="standard" cellpadding="4" cellspacing="0" border="0" width="100%">
                                                <tr class="tblhead"><td colspan="2">Actualizar la base de datos</td></tr>
                                                <tr class="firstcolor">
                                                        <td>Universo</td>
                                                        <td>
                                                                <select name="universo">
                                                                        <?php
                                                                                $unis = $db->db_query("SELECT numero FROM universos", true);
										if (!isset($_SESSION["universo"])) $_SESSION["universo"] = $unis[0]["numero"];
                                                                                foreach($unis as $uni){
                                                                                        print("<option value='".$uni["numero"]."'");
                                                                                        if ($_SESSION["universo"] == $uni["numero"]) echo 'selected';
                                                                                        echo ">".$uni["numero"];
                                                                                }
                                                                        ?>
                                                                </select>
                                                        </td>
                                                </tr>
						<tr class="firstcolor">
							<td>Sesion</td>
							<td><input class="textfield" name="sesion" type="" value="<?php echo $_SESSION["sesion"]; ?>" /></td>
						</tr>
                                                <tr class="firstcolor">
                                                        <td>Rango</td>
                                                        <td>Desde la galaxia
                                                                <input class="textfield" name="galaxia1" type="text" size="3" maxlength="2" value="<?php echo $_SESSION["galaxia1"]; ?>" onKeyUp="check_recursos()"> a la
                                                                <input class="textfield" name="galaxia2" type="text" size="3" maxlength="2" value="<?php echo $_SESSION["galaxia2"]; ?>" onKeyUp="check_recursos()">
                                                        <br>
                                                        Desde el sistema
                                                                <input class="textfield" name="sistema1" type="text" size="5" maxlength="3" value="<?php echo $_SESSION["sistema1"]; ?>" onKeyUp="check_recursos()"> al
                                                                <input class="textfield" name="sistema2" type="text" size="5" maxlength="3" value="<?php echo $_SESSION["sistema2"]; ?>" onKeyUp="check_recursos()">
                                                        </td>
                                                </tr>
						<tr class="firstcolor">
							<td>Deuterio</td>
							<td id="deuterio"></td>
						</tr>
						<tr class="firstcolor">
							<td>Tiempo</td>
							<td id="tiempo"></td>
						</tr>
                                                <tr class="firstcolor" valign="top">
                                                        <input type="hidden" name="update" value="true" />
                                                        <td align="center" colspan="2"><input class="button" type="submit" name="buscar" value="Actualizar" /></td>
                                                </tr>
						<SCRIPT type="text/javascript">check_recursos();</SCRIPT>
				</td></tr>
			</table>
		</form>

<?php

if (isset($_SESSION["update"]) && isset($_SESSION["sesion"])){
/*	echo "	<br>
		<font color='white'>Por favor, espera...</font>
		<div id=tiempo_restante></div>
		<script type=text/javascript>
			time = calcular_tiempo(); 
			fin = false;
			countdown();
	       </script>"; flush();
*/
	unset($_SESSION["update"]);
	$session = $_SESSION["sesion"];

	$servidor = $db->db_query("SELECT servidor FROM universos WHERE numero=".$_SESSION["universo"], true);
	$servidor = $servidor[0]["servidor"];

	$galaxias = range($_SESSION["galaxia1"], $_SESSION["galaxia2"]);
	srand((float)microtime() * 1000000);
	shuffle($galaxias);

	foreach($galaxias as $galaxy){

		$sistemas = range($_SESSION["sistema1"], $_SESSION["sistema2"]);
		srand((float)microtime() * 1000000);
		shuffle($sistemas);

		foreach($sistemas as $system){
//			$startTime = array_sum(explode(" ",microtime()));

//			print("[$galaxy:$system]");

			$post_data = "session=$session&galaxy=$galaxy&system=$system&auto=dr";
			$url = "http://$servidor/game/galaxy.php?session=$session";
			$opts = array(
			        'http' => array(
			                'method' => 'POST',
					'header' => 	"Content-Type: application/x-www-form-urlencoded\r\n".
							"User-Agent: ".$_SERVER["HTTP_USER_AGENT"]."\r\n".
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
				while (!feof($handle)) {
					$contents .= fread($handle, 8192);
				}
				fclose($handle);
			}

			preg_match_all("/<(tr)[^>]*>(.*?)<\/\\1>/si", $contents, $out_tr);

			if (empty($out_tr[0])){
				print("<font color=\"red\">Sesion no valida!</font>");
				$error = true;
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
					preg_match("/&a=(.*?)\\\/si", $out_th[0][6], $alianza_id);
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
						$db->db_query("REPLACE INTO uni18 (galaxia, sistema, planeta, nombre_planeta, luna, jugador) VALUES (
							\"".$datos['galaxia']."\", 
							\"".$datos['sistema']."\", 
							\"".$datos['planeta']."\", 
							\"".$datos['planeta_nombre']."\", 
							\"".$datos['luna']."\", 
							\"".$datos['jugador']["id"]."\"
							)", false);
						$db->db_query("REPLACE INTO uni18_jugadores VALUES (
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
							$db->db_query("REPLACE INTO uni18_alianzas VALUES (
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
	print("<script type=\"text/javascript\">fin = true;</script>");
}

$resultados = $db->db_query("SELECT galaxia, sistema, timestamp FROM uni".$_SESSION["universo"]." GROUP BY galaxia, sistema ORDER BY timestamp ASC LIMIT 10", true);
print("<br>");
print("<table width=\"50%\" border=\"0\" cellspacing=\"2\" cellpadding=\"0\" align=\"center\">");
print("<tr><td align=\"center\" class=\"tblhead\" colspan=\"10\">Sistemas mas antiguos</td></tr>");
print("<tr>
	<td align=\"center\" class=\"tblhead\">Galaxia</td>");
print("	<td align=\"center\" class=\"tblhead\">Sistema</td>
	<td align=\"center\" class=\"tblhead\">Fecha</td>
	<td align=\"center\" class=\"tblhead\">Actualizar</td>
       </tr>");
if (!empty($resultados)){
	foreach($resultados as $resultado){
		print("<tr class=\"firstcolor\">
			<td align=\"center\">".$resultado["galaxia"]."</td>
			<td align=\"center\">".$resultado["sistema"]."</td>
			<td align=\"center\">".$resultado["timestamp"]."</td>
			<td align=\"center\">
				<input type=\"button\" onClick=\"set_range('".$resultado["galaxia"]."','".$resultado["galaxia"]."','1','499')\" value=\"Galaxia ".$resultado["galaxia"]."\">
				<input type=\"button\" onClick=\"set_range('".$resultado["galaxia"]."','".$resultado["galaxia"]."','".$resultado["sistema"]."','".$resultado["sistema"]."')\" value=\"Sistema ".$resultado["galaxia"].":".$resultado["sistema"]."\">
			</td>
		       </tr>");
	}
}else{
	print("<tr class=\"firscolor\"><td align=\"center\" colspan=\"4\"><font color=\"red\">Universo vacio!</font></td></tr>");
}
print("</table>");

?>
	</body>
</html>	

