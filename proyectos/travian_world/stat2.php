<?php

// Funciones de acceso a BD
require_once('include/db_mysql.php');

// Parametros de configuracion
require_once('include/conf.php');

require_once('include/graph.php');

if (isset($_GET["server"])) $server = $_GET["server"];
else if (isset($_POST["server"])) $server = $_POST["server"];
else die("[ERROR] Servidor no especificado");

if (isset($servers[$server])) $tabla = $servers[$server];
else if (in_array($server, $servers)) $tabla = $server;
else die("[ERROR] Servidor desconocido");

//if ($tabla == "net3"){ header("Content-Type: image/png"); readfile("error_s3.png"); exit; }

if (isset($_REQUEST["out"])){
	switch($_REQUEST["out"]){
		case 'png':
		case 'jpeg':
		case 'gif': $formato = $_REQUEST["out"]; break;
		default: $formato = 'png';
	}
} else $formato = 'png';

function check_image($basename){
	global $imagen;
	global $formato;
	global $db;
	global $db_url;

	$imagen = new Grafico(300, 200, $basename);
	$imagen->formato = $formato;
	$imagen->not_modified_since();
	$imagen->cache_valida();

	// Conecta con la base de datos
	$db = new DB_Sql();
	$db->db_connect($db_url);
}

// Segun el tipo de consulta realiza la peticion SQL adecuada
if (isset($_REQUEST["id"])){
	$basename = $tabla."_id_".$_REQUEST["id"];
	check_image($basename);
	$resultados = $db->db_query("SELECT fecha, spieler, dorfname, einwohner 
					FROM $tabla 
					WHERE id = ".$_REQUEST["id"]." 
					ORDER BY fecha ASC", true);
	if (!empty($resultados)){
		$ultimo = end($resultados);
		$titulo = $ultimo["dorfname"]." (".$ultimo["spieler"].")";
	}
}else if(isset($_REQUEST["uid"])){
	$basename = $tabla."_uid_".$_REQUEST["uid"];
	check_image($basename);
	$resultados = $db->db_query("SELECT fecha, spieler, SUM(einwohner) AS einwohner 
					FROM $tabla
					WHERE uid = ".$_REQUEST["uid"]." 
					GROUP BY fecha 
					ORDER BY fecha ASC", true);
	if (!empty($resultados)){
		$ultimo = end($resultados);
		$titulo = $ultimo["spieler"];
	}
}else if(isset($_REQUEST["aid"])){
	$basename = $tabla."_aid_".$_REQUEST["aid"];
	check_image($basename);
	$resultados = $db->db_query("SELECT fecha, allianz, SUM(einwohner) AS einwohner 
					FROM $tabla
					WHERE aid = ".$_REQUEST["aid"]." 
					GROUP BY fecha 
					ORDER BY fecha ASC", true);
	if (!empty($resultados)){
		$ultimo = end($resultados);
		$titulo = $ultimo["allianz"];
	}
}else{
	die("Argumentos insuficientes");
}

// Si existen datos para esa aldea, jugador o alianza se agrupan en arrays para su representacion grafica
if (empty($resultados) || count($resultados) < 2) die("No hay suficientes datos");
foreach($resultados as $resultado){ 
	$ydata[] = $resultado["einwohner"];
	$xdata[] = $resultado["fecha"];
}

header("Cache-Control: Public");
header("Pragma: Public");

$imagen->SetX($xdata);
$imagen->AddY($ydata, RED);
$imagen->SetTitulo($titulo);
$imagen->dibujar();

?>
