<?php
require_once('include/conf.php');
unset($servers);
$servers["s2.travian.net"] = array("tabla" => "net2", "version" => "2");
$servers["s3.travian.net"] = array("tabla" => "net3", "version" => "3");
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

function check_range($a, $low, $high){ return ($a >= $low && $a <= $high); }

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

?>
<html>
        <head>
                <title>Buscador de inactivos</title>
                <link rel="stylesheet" href="css/style.css" type="text/css">
        </head>
        <body class="slr3">
		<h1><b>Buscador de inactivos</b></h1>
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
					<td class="rbg s7 f8">Jugador</td>
					<td><input class="fm" name="jugador" type="text" value="<?=$_REQUEST["jugador"];?>" /></td>
				</tr>
				<tr>
					<td class="rbg s7 f8">Aldea</td>
					<td><input class="fm" name="nombre_aldea" type="text" value="<?=$_REQUEST["nombre_aldea"];?>" /></td>
				</tr>
				<tr>
					<td class="rbg s7 f8">Alianza</td>
					<td><input class="fm" name="nombre_alianza" type="text" value="<?=$_REQUEST["nombre_alianza"];?>" /></td>
				</tr>
				<tr>
					<td class="rbg s7 f8">Habitantes</td>
					<td>Desde <input class="fm" name="hab_min" type="text" size="4" maxlength="5" value="<?=$_REQUEST["hab_min"];?>" /> hasta <input class="fm" name="hab_max" type="text" size="4" maxlength="5" value="<?=$_REQUEST["hab_max"];?>"/></td>
				</tr>
				<tr>
					<td class="rbg s7 f8">Lugar</td>
					<td>Centro en <input class="fm" name="x" type="text" size="4" maxlength="5" value="<?=$_REQUEST["x"];?>" />, <input class="fm" name="y" type="text" size="4" maxlength="5" value="<?=$_REQUEST["y"];?>"/> y radio (max. <?=$max_radio;?>) <input class="fm" name="radio" type="text" size="4" maxlength="5" value="<?=$_REQUEST["radio"];?>"/></td>
				</tr>
				<tr>
					<td class="rbg s7 f8">Estado</td>
					<td><input name="inactivo" type="checkbox" <?php if ($_REQUEST["inactivo"] == "on") echo "checked"; ?> /> Inactivo</td>
				</tr>
				<tr>
					<td class="rbg s7 f8">Ordenar por</td>
					<td>
						<input name="sort" type="radio" value="0" <?php if ($_REQUEST["sort"] == 0) echo "checked"; ?>  />Jugador
						<input name="sort" type="radio" value="1" <?php if ($_REQUEST["sort"] == 1) echo "checked"; ?>  />Alianza
						<input name="sort" type="radio" value="2" <?php if ($_REQUEST["sort"] == 2) echo "checked"; ?>  />Habitantes
						<input name="sort" type="radio" value="3" <?php if ($_REQUEST["sort"] == 3) echo "checked"; ?> />Coordenadas
						<br>
						<input name="sortorder" type="radio" value="0" <?php if ($_REQUEST["sortorder"] == 0) echo "checked"; ?> />Ascendente
						<input name="sortorder" type="radio" value="1" <?php if ($_REQUEST["sortorder"] == 1) echo "checked"; ?> />Descendente
					</td>
				</tr>
				<tr>
					<td class="rbg s7 f8">Resultados por pagina</td>
					<td>
						<select name="entries">
						<?php 
							$entries = array(10, 20, 50);
							foreach($entries as $entry){ 
								print("<option value='$entry'");
								if ($_REQUEST["entries"] == $entry) echo 'selected';
								echo ">".$entry;
							} 
						?>
						</select>
					</td>
				</tr>

				<tr class="rbg">
					<td colspan="2" align="center">
						<input type="hidden" name="num_resultados" value="<?php echo $_REQUEST["num_resultados"]; ?>"/>
						<input type="submit" name="buscar" value="Buscar"/>
						<input type="reset"/>
					</td>
				</tr>
			</table>
		</form>
		<br>
<?php

if (isset($_REQUEST["buscar"])){
	$variables = array("servidor", "jugador", "nombre_aldea", "nombre_alianza", "hab_min", "hab_max", "x", "y", "radio", "inactivo", "sort", "sortorder", "entries");
	foreach($variables as $variable) $$variable = $_REQUEST[$variable];

	if (isset($servers[$servidor])) $tabla = $servers[$servidor]["tabla"];
	else $error = "[ERROR] Servidor desconocido";
	$version = $servers[$servidor]["version"];

	$variables = array("x", "y", "radio", "hab_min", "hab_max", "entries");
	foreach($variables as $variable) if(!empty($$variable) && !is_numeric($$variable)) $error = "[ERROR] Valores numericos no validos";
	if (!check_range($radio, 0, $max_radio)) $error = "[ERROR] Radio de busqueda no valido";

	$where = array();
	if (!empty($jugador)) $where[] = "spieler LIKE '".str_replace("*", "%", $jugador)."'";
	if (!empty($nombre_aldea)) $where[] = "dorfname LIKE '".str_replace("*", "%", $nombre_aldea)."'";
	if (!empty($nombre_alianza)) $where[] = "allianz LIKE '".str_replace("*", "%", $nombre_alianza)."'";
	if (!empty($hab_min)) $where[] = "einwohner >= $hab_min";
	if (!empty($hab_max)) $where[] = "einwohner <= $hab_max";
	if (empty($where)) $error = "[ERROR] Debe especificar al menos una condicion de busqueda";

	if (!isset($error)){
//		require_once('include/db_mysql.php');
//		$db = new DB_Sql();
//		$db->db_connect($db_url);

//		if ($_REQUEST["inactivo"] != "on") $WHERE[] = "fecha = CURDATE()"; 

		$query = "FROM $tabla";
		if (!empty($where)){
			$query .= " WHERE ";
			foreach($where as $where_clause){
				$query .= "AND $where_clause ";
//				if ($WHERE[count($WHERE) - 1] != $where_clause) $query .= " AND ";
			}
		}

print($query);
/*
	if (empty($_REQUEST["num_resultados"])){
		if (count($WHERE) == 0) $count_query = $query." WHERE fecha = CURDATE()"; 
		else if($_REQUEST["inactivo"] == 'on') $count_query = $query." AND fecha = CURDATE()";
		else $count_query = $query;
		
		$num_resultados = $db->db_query("SELECT count(*) AS cantidad ".$count_query." GROUP BY fecha", true);
		$num_resultados = $num_resultados[0]["cantidad"];
		$_REQUEST["num_resultados"] = $num_resultados;
	}else{
		$num_resultados = $_REQUEST["num_resultados"];
	}

	$query .= " ORDER BY ";
	switch($sort"]){
		case 0: $query .= "spieler"; break;
		case 1: $query .= "allianz"; break;
		case 2: $query .= "einwohner"; break;
		case 3: $query .= "x, y"; break;
	}
	switch($sortorder){
		case 0: $query .= " ASC "; break;
		case 1: $query .= " DESC "; break;
	}

	if (isset($_REQUEST["page"])) $page = $_REQUEST["page"]; else $page = 1;
	$limit .= " LIMIT ".(($page - 1) * $_REQUEST["entries"]).",".$_REQUEST["entries"];

print($query.$limit);

	if ($_REQUEST["inactivo"] != 'on'){
		$resultados = $db->db_query("SELECT * ".$query.$limit, true);
		if (!empty($resultados)){
			start_table($num_resultados, $page);
			foreach($resultados as $resultado) display_result($resultado);
			end_table($num_resultados, $page);
		}else{
			echo '<div align="center">Sin resultados</div>';
		}
	}else{
//		$resultados = $db->db_query("SELECT fecha, SUM(einwohner) AS einwohner ".$query.$limit." GROUP BY fecha", true);
//print("<pre>"); print_r($resultados); print("</pre>");
	}
}
//select t1.spieler, t1.dorfname, t2.einwohner - t1.einwohner from net1 t1, net1 t2 where t1.fecha = curdate() and t2.fecha = curdate() - interval 1 day and t1.id = t2.id and t1.einwohner < t2.einwohner and (t2.einwohner - t1.einwohner) > 500 order by t1.spieler asc;

//SELECT fecha, SUM(einwohner) FROM net1 WHERE spieler='Croc' GROUP BY fecha ORDER BY fecha ASC;
//SELECT fecha, spieler, SUM(einwohner) AS einwohner FROM net1 GROUP BY fecha,spieler ORDER BY spieler, fecha ASC LIMIT 0,10;
*/
	}else echo "<div align='center' style='color:#FF0000'>$error</div>";
}
?>
	</body>
</html>
