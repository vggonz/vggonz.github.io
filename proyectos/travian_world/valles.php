<?php
require_once('include/conf.php');

// Solucion provisional para manejar multiples versiones del juego simultaneamente
unset($servers);
$servers["s3.travian.net"] = array("tabla" => "net3", "version" => "3");
//$servers["s2.travian.net"] = array("tabla" => "net2", "version" => "2");
//$servers["s1.travian.net"] = array("tabla" => "net1", "version" => "2");

$max_resultados = 30;
$max_radio = 20;

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
		case 2: return (($id - 3079) % 512 - 250); break;
		case 3: return (($id - 1) % 801 - 400); break;
	}
}

// Funcion que calcula la coordenada Y a partir del ID
function id2y($id){
	global $version;
	switch($version){
		case 2: return (250 - (int)(($id - 3079) / 512)); break;
		case 3: return (400 - (int)(($id - 1) / 801)); break;
	}
}

// Normaliza una coordenada para la forma especial del mundo
function norm_coord($c){
	global $version;
	switch($version){
		case 2: if ($c > 250) return ($c - 501);
			if ($c < -250) return ($c + 501); break;
		case 3:
			if ($c > 400) return ($c - 801);
			if ($c < -400) return ($c + 801); break;
	}
	return $c;
}

// Comprueba si una variable contiene un valor entero
function isint($x){ return (is_numeric($x) ? intval($x) == $x : false); }

// Calcula el ID de una casilla desplazada
function id_desp($id, $x, $y){ return xy2id(norm_coord(id2x($id) + $x), norm_coord(id2y($id) + $y)); }

function en_rango($desp_x, $desp_y, $radio){
	$distancia = sqrt(($desp_x * $desp_x) + ($desp_y * $desp_y));
	if($distancia <= $radio) return true; else return false;
}

function dividir_id($ids){
	sort($ids);
	$out = array();
	for ($i = 0; $i < count($ids); $i++){
		if (isset($ids[$i+1]) && $ids[$i+1] == $ids[$i] + 1){
			$aux[] = $ids[$i];
		}else{
			$aux[] = $ids[$i];
			$out[] = $aux;
			$aux = array();
		}
	}
	return $out;
}

function start_table(){
        echo '<table width="95%" border="0" cellspacing="2" cellpadding="0" align="center" class="tbg">';
        echo '<tr class="cbg1"><td align="center" colspan="6">Resultados</td></tr>';
	echo '<tr class="cbg1">
                <td align="center">Coordenadas</td>
		<td align="center">Distribucion</td>
                <td align="center">Jugador</td>
                <td align="center">Aldea</td>
                <td align="center">Habitantes</td>
                <td align="center">Alianza</td>
        </tr>';
}

function display_result($resultado){
	global $servidor;
	echo '<tr>
		<td align="center"><nobr><a target="_blank" href="http://'.$servidor.'/karte.php?z='.$resultado["id"].'">'.id2x($resultado["id"]).', '.id2y($resultado["id"]).'</a></nobr></td>
		<td align="center"><nobr>
			<img src="img/r1.gif" width="18" height="12" border="0" alt="Madera"> '.$resultado["madera"].'
			<img src="img/r2.gif" width="18" height="12" border="0" alt="Barro"> '.$resultado["barro"].'
			<img src="img/r3.gif" width="18" height="12" border="0" alt="Hierro"> '.$resultado["hierro"].'
			<img src="img/r4.gif" width="18" height="12" border="0" alt="Cereal"> '.$resultado["cereal"].'
		</nobr></td>
		<td align="center"><nobr><a target="_blank" href="http://'.$servidor.'/spieler.php?uid='.$resultado["uid"].'">'.$resultado["spieler"].'</a></nobr></td>
		<td align="center"><nobr><a target="_blank" href="http://'.$servidor.'/karte.php?d='.$resultado["id"].'">'.$resultado["dorfname"].'</a></nobr></td>
		<td align="center">'.$resultado["einwohner"].'</td>
		<td align="center"><nobr><a target="_blank" href="http://'.$servidor.'/allianz.php?aid='.$resultado["aid"].'">'.$resultado["allianz"].'</a></nobr></td>
	</tr>';
}

?>

<html>
        <head>
                <title>Buscador de Valles</title>
                <link rel="stylesheet" href="css/style.css" type="text/css">
        </head>
        <body class="slr3">
		<h1><b>Buscador de Valles</b></h1>
                <form name="buscar" method="POST" action="<?php echo $_SERVER["PHP_SELF"]; ?>">
			<table class="tbg" cellpadding="2" cellspacing="1" border="0" align="center">
				<tr class="cbg1"><td colspan="2">Buscar en la base de datos</td></tr>
				<tr>
					<td class="rbg s7 f8">Servidor</td>
					<td>
						<select name="servidor">
						<?php 
							foreach($servers as $server => $table){ 
								print("<option value='$server'");
								if ($_REQUEST["servidor"] == $server) echo 'selected';
								echo ">".$server;
							} 
						?>
						</select>
					</td>
				</tr>
				<tr>
					<td class="rbg s7 f8">Centro</td>
					<td><input class="fm" name="x" type="text" size="4" maxlength="5" value="<?php echo $_REQUEST["x"]; ?>" />, <input class="fm" name="y" type="text" size="4" maxlength="5" value="<?php echo $_REQUEST["y"]; ?>"/></td>
				</tr>
				<tr>
					<td class="rbg s7 f8">Radio (max. <?php echo $max_radio; ?>)</td>
					<td><input class="fm" name="radio" type="text" size="4" maxlength="5" value="<?php echo $_REQUEST["radio"]; ?>"/></td>
				</tr>
				<tr>
					<td class="rbg s7 f8">Distribucion</td>
					<td><?php
						$variables = array("madera", "barro", "hierro", "cereal");
						foreach($variables as $variable){
							print(ucfirst($variable)." <input class='fm' name='$variable' type='text' size='2' maxlength='2' value='".$_REQUEST[$variable]."'/> ");
						}
					?></td>
				</tr>
				<tr>
					<td class="rbg s7 f8">Estado</td>
					<td><input name="abandonado" type="checkbox" <?php if ($_REQUEST["abandonado"] == "on") echo "checked"; ?> /> Abandonado</td>
				</tr>
				<tr>
					<td colspan="2" align="center">
						<input type="submit" name="buscar" value="Buscar"/>
						<input type="reset"/>
					</td>
				</tr>
			</table>
		</form>
		<br>
<?php

if (isset($_REQUEST["buscar"])){
	$variables = array("servidor", "x", "y", "abandonado", "radio", "madera", "barro", "hierro", "cereal");
	foreach($variables as $variable) $$variable = $_REQUEST[$variable];

	if (isset($servers[$servidor])) $tabla = $servers[$servidor]["tabla"];
	else $error = "[ERROR] Servidor desconocido";
	$version = $servers[$servidor]["version"];

	$variables = array("x", "y", "radio");
	foreach($variables as $variable) if(!is_numeric($$variable)) $error = "[ERROR] Valores no validos";
	if ($radio <= 0 || $radio > $max_radio) $error = "[ERROR] Radio de busqueda no valido";

	$variables = array("madera", "barro", "hierro", "cereal");
	foreach($variables as $variable){
		if ($$variable != ''){
			$where .= " AND $variable = ".$$variable;
			if (!is_numeric($$variable)) $error = "[ERROR] Distribucion no valida";
		}
	}
	if (!isset($where)) $error = "[ERROR] Debe especificar al menos una condicion de busqueda";

	if (!isset($error)){
		require_once('include/db_mysql.php');
		$db = new DB_Sql();
		$db->db_connect($db_url);

		$ids = array();
		$center_id = xy2id($x, $y);
		for ($i = -$radio; $i <= $radio; $i++) {
			for ($j = -$radio; $j <= $radio; $j++) {
				$nuevo_id = id_desp($center_id, $i, $j);
				$distancia = sqrt($i * $i + $j * $j);
				if ($distancia < $radio) $ids[] = $nuevo_id;
			}
		}
		$ids = dividir_id($ids);

		$resultados = array();
		foreach($ids as $nuevos_ids){
			$resultados1 = $db->db_query("SELECT ".$tabla."_r.id, madera, barro, hierro, cereal, dorfname, spieler, uid, allianz, aid, einwohner FROM ".$tabla."_r LEFT JOIN $tabla ON $tabla.id = ".$tabla."_r.id AND fecha = (SELECT max(fecha) FROM $tabla) WHERE ".$tabla."_r.id BETWEEN ".min($nuevos_ids)." AND ".max($nuevos_ids)." $where", true);
			if (!empty($resultados1)){
				foreach($resultados1 as $resultado){
					if (($abandonado == 'on' && $resultado["uid"] == NULL) || $abandonado != 'on'){
						$resultado["distancia"] = sqrt((abs($x - id2x($resultado['id'])) << 1) + (abs($y - id2y($resultado["id"])) << 1));
						$resultados[] = $resultado;
					}
				}
			}
			if (count($resultados) > $max_resultados) break;
		}
		if (!empty($resultados)){
			usort($resultados, create_function('$a, $b', "return \$a['distancia'] > \$b['distancia'];"));
			start_table();
			foreach($resultados as $resultado) display_result($resultado);
			print("</table>");
		}else echo '<div align="center">Sin resultados</div>';
	}else echo "<div align='center' style='color:#FF0000'>$error</div>";
}
?>
</body>
</html>
