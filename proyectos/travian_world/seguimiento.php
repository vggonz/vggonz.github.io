<?php

// Funciones de acceso a BD
require_once('include/db_mysql.php');

// Parametros de configuracion
require_once('include/conf.php');

// Conecta con la base de datos
$db = new DB_Sql();
$db->db_connect($db_url);

$tabla = $argv[1];
$aid = $argv[2];

$resultados = array();
for($i = 6; $i >= 0; $i--){
	$resultado = $db->db_query("SELECT spieler FROM $tabla WHERE aid = $aid AND fecha = CURDATE() - INTERVAL $i DAY GROUP BY uid", true);
	$miembros = array();
	if (!empty($resultado)){ 
		foreach($resultado as $miembro) $miembros[] = $miembro["spieler"];
		$resultados[] = $miembros;
	}
}

for ($i = 0; $i < 7; $i++){
	$resultado1 = $resultados[$i]; // Ayer
	$resultado2 = $resultados[$i+1]; // Hoy

	if ($resultado1 && $resultado2){
		$unido = array_diff($resultado2, $resultado1);
		$abandonado = array_diff($resultado1, $resultado2);

		if (!empty($unido) || !empty($abandonado)){
			print("Hace ".(6 - $i)." dias\n");
			if (!empty($unido)){
				print("Se han unido a la alianza\n");
				print_r(array_diff($resultado2, $resultado1));
			}
			if (!empty($abandonado)){
				print("Han abandonado la alianza\n");
				print_r(array_diff($resultado1, $resultado2));
			}
			print("\n\n");
		}
	}

}

$miembros = $db->db_query("SELECT uid, spieler FROM $tabla WHERE aid = $aid AND fecha = (SELECT MAX(fecha) FROM $tabla) GROUP BY uid", true);

foreach($miembros as $miembro){
	$habitantes = $db->db_query("SELECT SUM(einwohner) AS habitantes, fecha FROM $tabla WHERE uid = ".$miembro["uid"]." GROUP BY fecha ORDER BY fecha ASC", true);
	$hab1 = $habitantes[0]["habitantes"];
	$hab2 = $habitantes[count($habitantes) - 1]["habitantes"];
	$rendimiento = ($hab2 - $hab1)/7;
	if ($rendimiento < 1) print("El jugador ".$miembro["spieler"]." ha pasado de $hab1 a $hab2 en 7 dias. Rendimiento = $rendimiento\n");
}

?>
