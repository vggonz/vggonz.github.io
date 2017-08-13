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

// Conecta con la base de datos
$db = new DB_Sql();
$db->db_connect($db_url);

if (!isset($_REQUEST["aid"])) die("[ERROR] Argumentos insuficientes");

$resultados = $db->db_query("SELECT uid 
				FROM $tabla
				WHERE aid = ".$_REQUEST["aid"]." and fecha = (SELECT MAX(fecha) FROM $tabla)
				ORDER BY einwohner DESC", true);

// Si existen datos para esa aldea, jugador o alianza se agrupan en arrays para su representacion grafica
if (empty($resultados)) die("[ERROR] No hay suficientes datos");

$imagen = new Grafico(600, 400, "ally_".$tabla."_aid_".$_REQUEST["aid"]);

$titulo = $db->db_query("SELECT allianz
		FROM $tabla
		WHERE aid = ".$_REQUEST["aid"], true);
$imagen->SetTitulo($titulo[0]["allianz"]);

foreach($resultados as $resultado){
	$ydata = array();
	$xdata = array();
	$resultados2 = $db->db_query("SELECT SUM(einwohner) AS einwohner, fecha
					FROM $tabla 
					WHERE uid = ".$resultado["uid"]." 
					GROUP BY fecha 
					ORDER BY fecha ASC", true);
	foreach($resultados2 as $resultado2){
	        $ydata[] = $resultado2["einwohner"];
	        $xdata[] = $resultado2["fecha"];
	}
	$imagen->AddY($ydata, RED);
}
$imagen->SetX($xdata);
$imagen->divisiones = 5;
$imagen->max_age = 0;
$imagen->dibujar();
?>
