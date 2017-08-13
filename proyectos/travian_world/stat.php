<?php

// Libreria de creacion de graficos
require_once("jpgraph/jpgraph.php");
// Tipo de grafico de lineas
require_once("jpgraph/jpgraph_line.php");

// Funciones de acceso a BD
require_once('include/db_mysql.php');

// Parametros de configuracion
require_once('include/conf.php');


if (isset($_GET["server"])) $server = $_GET["server"];
else if (isset($_POST["server"])) $server = $_POST["server"];
else die("[ERROR] Servidor no especificado");
if (!isset($servers[$server])) die("Server $server not supported. Sorry :(");

// Conecta con la base de datos
$db = new DB_Sql();
$db->db_connect($db_url);
// Segun el tipo de consulta realiza la peticion SQL adecuada
if (isset($_REQUEST["id"])){
	$basename = $servers[$server]."_id_".$_REQUEST["id"];
	$resultados = $db->db_query("SELECT fecha, spieler, dorfname, einwohner 
					FROM ".$servers[$server]." 
					WHERE id = ".$_REQUEST["id"]." 
					ORDER BY fecha ASC", true);
	if (!empty($resultados)){
		$ultimo = end($resultados);
		$titulo = $ultimo["dorfname"]." (".$ultimo["spieler"].")";
	}
}else if(isset($_REQUEST["uid"])){
	$basename = $servers[$server]."_uid_".$_REQUEST["uid"];
	$resultados = $db->db_query("SELECT fecha, spieler, SUM(einwohner) AS einwohner 
					FROM ".$servers[$server]." 
					WHERE uid = ".$_REQUEST["uid"]." 
					GROUP BY fecha 
					ORDER BY fecha ASC", true);
	if (!empty($resultados)){
		$ultimo = end($resultados);
		$titulo = $ultimo["spieler"];
	}
}else if(isset($_REQUEST["aid"])){
	$basename = $servers[$server]."_aid_".$_REQUEST["aid"];
	$resultados = $db->db_query("SELECT fecha, allianz, SUM(einwohner) AS einwohner 
					FROM ".$servers[$server]." 
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
$db->db_disconnect();

// Si existen datos para esa aldea, jugador o alianza se agrupan en arrays para su representacion grafica
if (empty($resultados)) die("No hay suficientes datos");
foreach($resultados as $resultado){ 
	$ydata[] = $resultado["einwohner"];
	$xdata[] = $resultado["fecha"];
}

// Definicion de los colores (gracias a rub3n)
$color_verde_claro = array(0x71, 0xD0, 0x00);
$color_verde_oscuro = array(0x71, 0xCC, 0x00);
$color_gris = array(0xCC, 0xCC, 0xCC);
$color_gris_claro = array(0xF0, 0xF0, 0xF0);
$color_naranja = array(0xFF, 0x80, 0x00);

// Crea el objeto de grafica (300x200 pixeles) con una vida de 12 horas en la cache
$graph = new Graph(300, 200, "$basename.png", 720);
$graph->SetScale("textlin");

// Margenes
$graph->img->SetMargin(60,20,20,80);
$graph->SetMarginColor('white');

// Titulo
$graph->title->Set($titulo);
$graph->title->SetFont(FF_FONT1, FS_BOLD);
$graph->title->SetColor($color_naranja);

// Eje vertical
$graph->yaxis->SetFont(FF_VERA, FS_BOLD, 8);
$graph->yaxis->SetColor($color_gris, $color_verde_oscuro);
$graph->yaxis->HideTicks(true,false);

// Eje horizontal
$graph->xaxis->SetFont(FF_VERA, FS_BOLD, 8);
$graph->xaxis->SetColor($color_gris, $color_verde_oscuro);
$graph->xaxis->SetTickLabels($xdata);
$graph->xaxis->SetLabelAngle(45); // Inclinado

// Datos
$lineplot = new LinePlot($ydata);
$lineplot->SetColor("red");
$lineplot->SetWeight(2);
$graph->Add($lineplot);

$graph->Stroke();
?>
