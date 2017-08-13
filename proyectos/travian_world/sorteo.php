<?php

// Funciones de acceso a BD
require_once('include/db_mysql.php');

// Parametros de configuracion
require_once('include/conf.php');

// Conecta con la base de datos
$db = new DB_Sql();
$db->db_connect($db_url);

$tabla = "net3";
$participantes = array(9103, 7587, 1825, 34612, 1855, 33524, 15833, 6702, 439, 23794, 11353, 5015, 23537, 39348,
			9982, 1978, 10871, 56961, 7817, 1205, 3713, 30976, 56603, 3522, 13304, 26711, 13198, 8753, 7227,
			55371, 42283, 12461, 2780, 3480, 26579, 17892, 2217, 1835, 133, 4973, 37023);

print("Hay ".count($participantes)." participantes\n");
$resultados = array();
$crecimiento_max = 0;
foreach($participantes as $participante){
	$a = $db->db_query("SELECT uid, spieler, SUM(einwohner) as habitantes, fecha FROM $tabla WHERE uid = $participante GROUP BY fecha ORDER BY fecha ASC", true);
	$muestras = count($a);
	if ($muestras != 7) continue;
	$hab1 = $a[0]["habitantes"];
	$hab2 = $a[count($a) - 1]["habitantes"];
	$rendimiento = (($hab2 - $hab1) * 100) / $hab1;
	$resultados[] = array($a[$muestras - 1]["spieler"], $a[0]["uid"], $hab1, $hab2, $rendimiento);
}

function ordenar_rendimiento($a, $b){
	if ($a[4] == $b[4]) return 0;
	else return ($a[4] > $b[4]) ? -1 : 1;
}

print("El crecimiento desde ".$a[0]['fecha']." hasta ".$a[$muestras - 1]['fecha']." ha sido:\n");
usort($resultados, "ordenar_rendimiento");
$i = 1;
foreach($resultados as $resultado){
	print(($i++).". [url=http://s3.travian.net/spieler.php?uid=$resultado[1]]$resultado[0][/url] $resultado[2] - $resultado[3] => ".number_format($resultado[4], 2)."%\n");
	if ($i <= 11) print("[img]http://www.denibol.com/proyectos/travian_world/stat-net3-uid-".$resultado[1].".png[/img]\n");
}

?>
