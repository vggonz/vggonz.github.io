<?php

return; // Este return esta para que no lo ejecuteis online, que os conozco :P

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

// Teoricamente, sustituyendo en el fichero karte.php por karte2.php y el tamanyo_cuadrante por 13, deberia
// indizar mas rapido, siempre que se disponga de Plus, claro.
$referer = "http://$servidor/karte.php";
$tamanyo_cuadrante = 7;
$centro_cuadrante = floor($tamanyo_cuadrante / 2);
$servidor = $argv[6];

$db = new DB_Sql();
$db->db_connect($db_url);

// La cookie es el valor de la cookie con nombre TB que proporciona el servidor al hacer login. Es como un identificador 
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
				"Cookie: TB=$cookie\r\n".
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

	// <img class="mt\d+" src="img/[^/]*/m/([^\d]*)(\d*).gif">
	preg_match_all('/<img class="mt\\d+" src="img\/[^\/]*\/m\/([^\\d]*)(\\d*).gif">/i', $contents, $tipos);
	// tipos[1][i] = Tipo de casilla (t, d)
	// tipos[2][i] = Variedad del tipo de casilla

	// <area[^?]*\?d=(\d*)"[^>]*>
	preg_match_all('/<area[^?]*\\?d=(\\d*)"[^>]*>/i', $contents, $direcciones);
	// direcciones[1][i] = ID de casilla

	$j = 0;
	for($i = 0; $i < sizeof($tipos[1]); $i++){
		$id_casilla = $direcciones[1][$j];
		switch($tipos[1][$i]){
			// En realidad la funcion "procesar_casilla_poblada" deberia valer tambien para las
			// casillas vacias, pero creo que en casillas vacias el otro metodo puede ser algo mas
			// rapido
			case "t": switch($tipos[2][$i]){
					case 0: procesar_casilla_vacia($id_casilla); break; // Casilla despoblada
					default: $j--;
				} break;
			case "d": procesar_casilla_poblada($id_casilla); break; // Casilla poblada
		}
		$j++;
	}
}

function procesar_casilla_vacia($id){
	global $servidor;
	print("Casilla ($id) => (".id2x($id).", ".id2y($id).")\n");
	$contents = get("http://$servidor/karte.php?d=$id");

	// <td align="right"><b>(\d*)[^>]*</b></td>
	preg_match_all('/<td align="right"><b>(\\d*)[^>]*<\/b><\/td>/i', $contents, $dist);
	// dist[1] Distribucion de los recursos

	insertar_info($id, $dist[1]);
	sleep(1);
}

function procesar_casilla_poblada($id){
	global $servidor;
	print("Casilla ($id) => (".id2x($id).", ".id2y($id).")\n");
	$contents = get("http://$servidor/karte.php?d=$id");

	// <img src="img/[^/]*/g/(\d)/r\d_0.gif"[^>]*>
	preg_match_all('/<img src="img\/[^\/]*\/g\/(\\d)\/r\\d_0.gif"[^>]*>/i', $contents, $dist);
	// dist[1][i] Tipo de recursos en el panal

	$recursos = array(4);
	for ($i = 0; $i < sizeof($recursos); $i++) $recursos[$i] = 0;
	for($i = 0; $i < sizeof($dist[1]); $i++) $recursos[$dist[1][$i] - 1]++;

	insertar_info($id, $recursos);
	sleep(1);
}

function insertar_info($id, $recursos){
	global $db;
	global $servidor;
	global $servers;

	$db->db_query("INSERT IGNORE INTO ".$servers[$servidor]."_r (id, madera, barro, hierro, cereal) VALUES 
			($id, '$recursos[0]','$recursos[1]','$recursos[2]','$recursos[3]')");
}

// Funcion que calcula el ID a partir de las coordenadas X e Y
function xy2id($x, $y){ return 3079 + ($x + 250) + (512 * abs($y - 250)); }

// Funcion que calcula la coordenada X a partir del ID
function id2x($id){ return (($id - 3079) % 512 - 250); }

// Funcion que calcula la coordenada Y a partir del ID
function id2y($id){ return (250 - (int)(($id - 3079) / 512)); }

// Normaliza una coordenada para la forma especial del mundo
function norm_coord($c){
        if ($c > 250) return ($c - 501);
        if ($c < -250) return ($c + 501);
        return $c;
}

// Calcula el ID de una casilla desplazada
function id_desp($id, $x, $y){ return xy2id(norm_coord(id2x($id) + $x), norm_coord(id2y($id) + $y)); }

?>
