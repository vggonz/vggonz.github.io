<?php

/***************************************************************************
 *   Copyright (C) 2006 by Fernando Monera   *
 *   fmonera@opensistemas.com   *
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.             *
 ***************************************************************************/

// Funciones de acceso a BD
require_once('include/db_mysql.php');

// Parametros de configuracion
require_once('include/conf.php');

$versions = array(
        "s1.travian.net"    =>    "2",
        "s2.travian.net"    =>    "2",
        "s3.travian.net"    =>    "3"
);

// Debe estar definido el servidor
if (isset($_GET["server"])) $server = $_GET["server"];
else if (isset($_POST["server"])) $server = $_POST["server"];
else die("[ERROR] Servidor no especificado");
$version = $versions["$server"];

// Funcion que calcula el ID a partir de las coordenadas X e Y
function xy2id($x, $y) {
	global $version;
	switch($version){
		case 2: return (3079 + ($x + 250) + (512 * abs($y - 250))); break;
		case 3: return 1 + ($x + 400) + (801 * abs($y - 400)); break;
	}
}

// Funcion que calcula la coordenada X a partir del ID
function id2x($id){
	global $version;
	switch($version){
		case 2: return (($id - 3079) % 512 - 250);
		case 3: return (($id - 1) % 801 - 400);
	}
}

// Funcion que calcula la coordenada Y a partir del ID
function id2y($id){
	global $version;
	switch($version){
		case 2:	return (250 - (int)(($id - 3079) / 512));
		case 3:	return (400 - (int)(($id - 1) / 801));
	}
}

// Comprueba si una variable contiene un valor entero
function isint($x){ return (is_numeric($x) ? intval($x) == $x : false); }

// Normaliza una coordenada para la forma especial del mundo
function norm_coord($c){
	global $version;
	switch($version){
		case 2: if ($c > 250) return ($c - 501);
			if ($c < -250) return ($c + 501);
		case 3: 
			if ($c > 400) return ($c - 801);
			if ($c < -400) return ($c + 801);
	}
	return $c;
}

// Calcula el ID de una casilla desplazada
function id_desp($id, $x, $y){ return xy2id(norm_coord(id2x($id) + $x), norm_coord(id2y($id) + $y)); }

// Calcula si una casilla se encuentra en el radio especificado
// Se pasan los valores de desplazamiento respecto a la coordenada origen
function en_rango($desp_x, $desp_y, $radio){
	$distancia = sqrt(($desp_x * $desp_x) + ($desp_y * $desp_y));
	if($distancia <= $radio) return true; else return false;
}

/**
	* @param array El array a ordenar
	* @param l La clave de ordenación
	* @param f La función de ordenación
	*/
function array_key_multi_sort(&$arr, $l , $f='strnatcasecmp') {
	return usort($arr, create_function('$a, $b', "return $f(\$a['$l'], \$b['$l']);"));
}

// Si estan definidas las coordenadas X e Y se obtiene el ID
if (isset($_REQUEST["xp"]) && isset($_REQUEST["yp"])){
    $center_x = $_REQUEST["xp"];
    $center_y = $_REQUEST["yp"];
    $center_id = xy2id($center_x, $center_y);
// Si esta definido el ID se obtienen las coordenadas X e Y
}else if(isset($_REQUEST["z"])){
    $center_id = $_REQUEST["z"];
    $center_x = id2x($center_id);
    $center_y = id2y($center_id);
}else{
    die("[ERROR] No hay suficientes parametros");
}

if (isset($_REQUEST["radio"])) $radio = $_REQUEST["radio"]; else $radio = 10;
if (isset($_REQUEST["unallied"]) && $_REQUEST["unallied"] == 1) $unallied = true; else $unallied = false;
if (isset($_REQUEST["casillashora"])) $casillashora = $_REQUEST["casillashora"];

// Conecta con la base de datos
$db = new DB_Sql();
$db->db_connect($db_url);

// Consulta las aldeas en el rango
$data = array();
for ($i = -$radio; $i <= $radio; $i++) {
	for ($j = -$radio; $j <= $radio; $j++) {
		$nuevo_id = id_desp($center_id, $i, $j);

		if(en_rango($i, $j, $radio) ) {
			if($unallied == 1) {
				$and_unallied = "AND allianz=''";
			} else {
				$and_unallied = "";
			}
			$query = "SELECT id, x, y, spieler, dorfname, allianz, einwohner FROM ".$servers[$server]." WHERE id = $nuevo_id ".($unallied ? "AND allianz = ''" : '')." ORDER BY fecha DESC LIMIT 1;";
			$resultados = $db->db_query($query, true);
			if($resultados[0]) {
				$resultados[0]['distancia'] = sqrt($i*$i + $j*$j);
				$data[] = $resultados[0];
			}
		}
	}
}
?>
<html>
    <head>
        <title>Buscador de objetivos</title>
        <link rel=stylesheet type="text/css" href="css/style.css">
    </head>
    <body bgcolor="#D5F0AA" style="background:#D5F0AA">
	<table width="100%" cellspacing="0" cellpadding="0" border=1>
	<tr>
		<td><b>Buscador de objetivos</b></td>
	</tr>
	<tr>
		<td><b>Server:</b> <?php echo "$server";?> | <b>X:</b> <?php echo "$center_x";?> <b>Y:</b> <?php echo "$center_y";?>
		  | <b>Radio:</b> <?php echo "$radio";?>
			<?php
				if(isset($casillashora)) echo "| <b>Velocidad:</b> $casillashora ";
				if($unallied) echo "| <b>Solo sin alianza</b>"; else echo "| <b>Todos</b>";
			?>
		</td>
	</tr>
	<tr>
		<td>
			<table width="100%" cellspacing="0" cellpadding="0" border=1>
			<tr>
				<td><b>Distancia</b></td>
<?php if (isset($casillashora)) echo "<td><b>Tiempo</b></td>"; ?>
				<td><b>X</b></td>
				<td><b>Y</b></td>
				<td><b>Jugador</b></td>
				<td><b>Aldea</b></td>
				<td><b>Alianza</b></td>
				<td><b>Habitantes</b></td>
			</tr>
<?php
	array_key_multi_sort($data, 'distancia');
	foreach($data as $aldea) {
		echo "<tr>";
		echo "<td>" . floor($aldea['distancia']*100)/100 . " &nbsp;</td>";
		if(isset($casillashora)) echo "<td>" . floor($aldea['distancia'] / $casillashora * 60) . "</td>";
		echo "<td>" . $aldea['x'] . " &nbsp;</td>";
		echo "<td>" . $aldea['y'] . " &nbsp;</td>";
		echo "<td>" . $aldea['spieler'] . " &nbsp;</td>";
		echo "<td><a href='http://$server/karte.php?d=" .$aldea['id'] . "'>" . $aldea['dorfname'] . "</a> &nbsp;</td>";
		echo "<td>" . $aldea['allianz'] . " &nbsp;</td>";
		echo "<td>" . $aldea['einwohner'] . " &nbsp;</td>";
		echo "</tr>";
	}
?>
			</td>
		</tr>
	</table>
    </body>
</html>
