<?php

return; // Para evitar que lo ejecuteis online, que os conozco :P

// El script indexa el rectangulo formado por las casillas diametralmente opuestas <x1, y1> y <x2, y2>
if ($argc != 7){
	print("Uso: php $argv[0] <cookie> <x1> <y1> <x2> <y2> <servidor>\n");
	exit();
}

require_once("include/conf.php");
require_once('include/db_mysql.php');

// No se hasta que punto realiza comprobaciones el servidor, por ello es conveniente sustituir este
// User Agent por el mismo que el del navegador con el que se inicio sesion
// Por ese mismo motivo es aconsejable que se realice desde la misma IP
$user_agent = "Opera/9.00 (X11; Linux i686; U; en)";

$tamanyo_cuadrante = 7;
$centro_cuadrante = floor($tamanyo_cuadrante / 2);
$servidor = $argv[6];
// Teoricamente, sustituyendo en el fichero karte.php por karte2.php y el tamanyo_cuadrante por 13, deberia
// indizar mas rapido, siempre que se disponga de Plus, claro.
$referer = "http://$servidor/karte.php";

$distribuciones = array(
	array (3, 3, 3, 9),
	array (3, 4, 5, 6),
	array (4, 4, 4, 6),
	array (4, 5, 3, 6),
	array (5, 3, 4, 6),
	array (1, 1, 1, 15)
);

$db = new DB_Sql();
$db->db_connect($db_url);

// La cookie es el valor de la cookie con nombre T3E que proporciona el servidor al hacer login. Es como un identificador 
// univoco de sesion. Si se consigue secuestrar ese valor de otro usuario, se puede acceder a su cuenta
$cookie = $argv[1];
$x = array($argv[2], $argv[4]);
$y = array($argv[3], $argv[5]);
sort($x); sort($y);

$pasos_x = ceil((abs($x[0] - $x[1]) + 1) / $tamanyo_cuadrante);
$pasos_y = ceil((abs($y[0] - $y[1]) + 1) / $tamanyo_cuadrante);
$pasos_x = ($pasos_x == 0 ? 1 : $pasos_x);
$pasos_y = ($pasos_y == 0 ? 1 : $pasos_y);

for ($i = 0; $i < $pasos_x; $i++){
	for ($j = 0; $j < $pasos_y; $j++){
		$id = xy2id(	$x[0] + ($i * $tamanyo_cuadrante) + $centro_cuadrante, 
				$y[0] + ($j * $tamanyo_cuadrante) + $centro_cuadrante);
		procesar_mapa($id);
		sleep(1);
	}
}

function get($url){
	global $cookie;
	global $servidor;
	global $user_agent;
	global $referer;

	$opts = array(
			'http' => array(
				'method' => 'GET',
				'header' => "Host: $servidor\r\n".
				"User-Agent: $user_agent\r\n".
				"Referer: $referer\r\n".
				"Cookie: T3E=$cookie\r\n".
				"Cookie2: \$Version=1\r\n"
				)
		     );
	$contextResource = stream_context_create($opts);
	$handle = fopen($url, 'r', false, $contextResource);
	$contents = '';
	if($handle){
		while (!feof($handle)) {
			$contents .= fread($handle, 8192);
		}
		fclose($handle);
	}
	return $contents;
}

function procesar_mapa($id){
	global $servidor;
	print("Mapa ($id) => (".id2x($id).", ".id2y($id).")\n");
	
	$contents = get("http://$servidor/karte.php?z=$id");

	// <img class="mt\d+" src="img/es/m/([^\d]*)(\d*).gif">
	preg_match_all('/<img class="mt\\d+" src="img\/un\/m\/([^\\d]*)(\\d+).gif">/i', $contents, $tipos);
	// tipos[1][i] = Tipo de casilla (t, d, o)
	// tipos[2][i] = Variedad del tipo de casilla

	// <area[^?]*\?d=(\d*)"[^>]*>
	preg_match_all('/<area[^?]*\\?d=(\\d*)"[^>]*>/i', $contents, $direcciones);
	// direcciones[1][i] = ID de casilla

	for($i = 0; $i < sizeof($tipos[1]); $i++){
		$id_casilla = $direcciones[1][$i];
		switch($tipos[1][$i]){
			case "t": procesar_casilla($id_casilla); break; // Casilla despoblada
			case "d": procesar_casilla($id_casilla); break; // Casilla poblada
			case "o": switch($tipos[2][$i]){
					case 1:
					case 2: insertar_info($id_casilla, array(1, 0, 0, 0)); break; // Leña
					case 3: insertar_info($id_casilla, array(1, 0, 0, 1)); break; // Mixto Leña-Cereal 
					case 4:
					case 5: insertar_info($id_casilla, array(0, 1, 0, 0)); break; // Barro
					case 6: insertar_info($id_casilla, array(0, 1, 0, 1)); break; // Mixto Barro-Cereal
					case 7:
					case 8: insertar_info($id_casilla, array(0, 0, 1, 0)); break; // Hierro
					case 9: insertar_info($id_casilla, array(0, 0, 1, 1)); break; // Mixto Hierro-Cereal
					case 10:
					case 11: insertar_info($id_casilla, array(0, 0, 0, 2)); break; // Mixto Cereal-Agua
					case 12: insertar_info($id_casilla, array(0, 0, 0, 1)); break; // Cereal
				} break;
		}
	}
}

function procesar_casilla($id){
	global $distribuciones;
	global $servidor;

	if (no_insertado($id)){
		print("Casilla ($id) => (".id2x($id).", ".id2y($id).")\n");

		$contents = get("http://$servidor/karte.php?d=$id");

		// <img src="img/un/g/f(\d+).jpg"[^>]*>
		preg_match_all('/<img src="img\/un\/g\/f(\\d+).jpg"[^>]*>/i', $contents, $dist);
		// dist[1][0] Distribucion de los recursos

		insertar_info($id, $distribuciones[$dist[1][0] - 1]);
		sleep(1);
	}
}

function no_insertado($id){
	global $db;
	global $servidor;
	global $servers;

	$resultado = $db->db_query("SELECT id FROM ".$servers[$servidor]."_r WHERE id = $id", true);
	return empty($resultado);
}

function insertar_info($id, $recursos){
	global $db;
	global $servidor;
	global $servers;

	$db->db_query("INSERT IGNORE INTO ".$servers[$servidor]."_r (id, madera, barro, hierro, cereal) VALUES 
			($id, '$recursos[0]','$recursos[1]','$recursos[2]','$recursos[3]')");
}

// Funcion que calcula el ID a partir de las coordenadas X e Y
function xy2id($x, $y){ return 1 + ($x + 400) + (801 * abs($y - 400)); }

// Funcion que calcula la coordenada X a partir del ID
function id2x($id){ return (($id - 1) % 801 - 400); }

// Funcion que calcula la coordenada Y a partir del ID
function id2y($id){ return (400 - (int)(($id - 1) / 801)); }

// Normaliza una coordenada para la forma especial del mundo
function norm_coord($c){
        if ($c > 400) return ($c - 801);
        if ($c < -400) return ($c + 801);
        return $c;
}

// Calcula el ID de una casilla desplazada
function id_desp($id, $x, $y){ return xy2id(norm_coord(id2x($id) + $x), norm_coord(id2y($id) + $y)); }

?>
