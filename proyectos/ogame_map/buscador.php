<?php 

require_once("include/config.php");
require_once('include/db_mysql.php');
require_once("include/functions.php");

$db = new DB_Sql();
$db->db_connect($db_url);

?>

<html>
	<head>
		<title>Cartografia</title>
		<link rel="stylesheet" href="css/style.css" type="text/css">
		<link rel="stylesheet" href="css/skin.css" type="text/css">
                <script language="JavaScript" src="js/functions.js"></script>				
	</head>
	<body onmousemove="tt_Mousemove(event);">
		<form name="buscar" method="get" action="<?php echo $_SERVER["PHP_SELF"]; ?>">
			<table cellpadding="1" cellspacing="0" border="0" align="center" width="95%">
				<tr><td>
					<table class="standard" cellpadding="4" cellspacing="0" border="0" width="100%">
						<tr class="tblhead"><td colspan="2">Buscar en la base de datos</td></tr>
						<tr class="firstcolor">
							<td>Universo</td>
							<td>
								<select name="universo">
									<?php
										$unis = $db->db_query("SELECT numero FROM universos", true);
										foreach($unis as $uni){
											print("<option value='".$uni["numero"]."'");
											if ($_REQUEST["universo"] == $uni["numero"]) echo 'selected'; 
											echo ">".$uni["numero"];
										}
									?>
								</select>
							</td>
						</tr>
						<tr class="firstcolor">
							<td>Etiqueda de Alianza</td>
							<td><input class="textfield" name="alianza" type="" value="<?php echo $_REQUEST["alianza"]; ?>" /></td>
						</tr>
						<tr class="firstcolor">
							<td>Nombre del jugador</td>
							<td><input class="textfield" name="jugador" type="" value="<?php echo $_REQUEST["jugador"]; ?>" /></td>
						</tr>
						<tr class="firstcolor">
							<td>Nombre del planeta</td>
							<td><input class="textfield" name="nombre_planeta" type="" value="<?php echo $_REQUEST["nombre_planeta"]; ?>" /></td>
						</tr>
						<tr class="firstcolor">
							<td>Solo planetas con luna</td>
							<td>
								<input name="luna" type="radio" value="1" <?php if ($_REQUEST["luna"] == 1) echo "checked"; ?> />Si
								<input name="luna" type="radio" value="0" <?php if ($_REQUEST["luna"] == 0) echo "checked"; ?> />No
							</td>
						</tr>
						<tr class="firstcolor">
							<td>Rango</td>
							<td>Desde la galaxia 
								<input class="textfield" name="galaxia1" type="text" size="3" maxlength="2" value="<?php echo $_REQUEST["galaxia1"]; ?>"> a la 
								<input class="textfield" name="galaxia2" type="text" size="3" maxlength="2" value="<?php echo $_REQUEST["galaxia2"]; ?>">
							<br>
							Desde el sistema 
								<input class="textfield" name="sistema1" type="text" size="5" maxlength="3" value="<?php echo $_REQUEST["sistema1"]; ?>"> al 
								<input class="textfield" name="sistema2" type="text" size="5" maxlength="3" value="<?php echo $_REQUEST["sistema2"]; ?>">
							<br>
							Desde el planeta
								<input class="textfield" name="planeta1" type="text" size="3" maxlength="2" value="<?php echo $_REQUEST["planeta1"]; ?>"> al 
								<input class="textfield" name="planeta2" type="text" size="3" maxlength="2" value="<?php echo $_REQUEST["planeta2"]; ?>">
							</td>
						</tr>

						<tr class="firstcolor">
							<td>Posicion</td>
							<td>Al menos top <input class="textfield" name="rank" type="text" size="4" maxlength="4" value="<?php echo $_REQUEST["rank"]; ?>"></td>
						</tr>

						<tr class="firstcolor">
							<td>Estado del jugador</td>
							<td>
								<input name="status1" type="checkbox" <?php if ($_REQUEST["status1"] == "on") echo "checked"; ?> />Vacaciones
								<input name="status2" type="checkbox" <?php if ($_REQUEST["status2"] == "on") echo "checked"; ?> />Suspendido
								<input name="status3" type="checkbox" onClick="checkForm()" <?php if ($_REQUEST["status3"] == "on") echo "checked"; ?> />Inactivo
								<input name="status4" type="checkbox" onClick="checkForm()" <?php if ($_REQUEST["status4"] == "on") echo "checked"; ?> />Muy Inactivo
							</td>
						</tr>
						
						<tr class="firstcolor">
							<td>Ordenar por</td>
							<td>
								<input name="sort" type="radio" value="0" <?php if ($_REQUEST["sort"] == 0) echo "checked"; ?> />Galaxia/Sistema
								<input name="sort" type="radio" value="1" <?php if ($_REQUEST["sort"] == 1) echo "checked"; ?>  />Nombre de jugador
								<input name="sort" type="radio" value="2" <?php if ($_REQUEST["sort"] == 2) echo "checked"; ?>  />Nombre de alianza
								<br>
								<input name="sortorder" type="radio" value="0" <?php if ($_REQUEST["sortorder"] == 0) echo "checked"; ?> />Ascendente
								<input name="sortorder" type="radio" value="1" <?php if ($_REQUEST["sortorder"] == 1) echo "checked"; ?> />Descendente
							</td>
						</tr>
						
						<tr class="firstcolor">
							<td>Resultados por pagina</td>
							<td>
								<select name="entries" class="pulldown_code">
								<?php
									$entries = array(10, 20, 50, 100);
									foreach($entries as $entry){
										print("<option value='$entry'");
										if ($_REQUEST["entries"] == $entry) echo 'selected';
										echo ">".$entry;
									}
								?>
								</select>
							</td>
						</tr>

						<tr class="firstcolor" valign="top">
	                                                <input type="hidden" name="num_resultados" value="<?php echo $_REQUEST["num_resultados"]; ?>"/>
							<td align="center" colspan="2"><input class="button" type="submit" name="buscar" value="Buscar" />&nbsp;<input type="reset"></td>
						</tr>
					</table>
				</td></tr>
			</table>
		</form>
<?php

if (isset($_REQUEST["buscar"])){

	$WHERE = array();
	if (!empty($_REQUEST["alianza"])) $WHERE[] = "alianzas.nombre LIKE '".str_replace("*", "%", $_REQUEST['alianza'])."'";
	if (!empty($_REQUEST["jugador"])) $WHERE[] = "jugadores.nombre LIKE '".str_replace("*", "%", $_REQUEST['jugador'])."'";
	if (!empty($_REQUEST["nombre_planeta"])) $WHERE[] = "universo.nombre_planeta LIKE '".str_replace("*", "%", $_REQUEST["nombre_planeta"])."'";
	if ($_REQUEST["luna"] == 1) $WHERE[] = "luna > 0";

	if (is_numeric($_REQUEST["galaxia1"])) {
		if ($_REQUEST["galaxia2"] == '') $_REQUEST["galaxia2"] = $_REQUEST["galaxia1"];
		$WHERE[] = "(galaxia BETWEEN '".$_REQUEST['galaxia1']."' AND '".$_REQUEST['galaxia2']."')";
	}

	if (is_numeric($_REQUEST["sistema1"])) {
		if ($_REQUEST["sistema2"] == '') $_REQUEST["sistema2"] = $_REQUEST["sistema1"];
		$WHERE[] = "(sistema BETWEEN '".$_REQUEST['sistema1']."' AND '".$_REQUEST['sistema2']."')";
	}

	if (is_numeric($_REQUEST["planeta1"])) {
		if ($_REQUEST["planeta2"] == '') $_REQUEST["planeta2"] = $_REQUEST["planeta1"];
		$WHERE[] = "(planeta BETWEEN '".$_REQUEST['planeta1']."' AND '".$_REQUEST['planeta2']."')";
	}

	if ($_REQUEST["status1"] == "on") {
		$WHERE[] = "jugadores.vacaciones = 1";
	}else{  $WHERE[] = "jugadores.vacaciones = 0"; }
	
	if ($_REQUEST["status2"] == "on") {
		$WHERE[] = "jugadores.suspendido = 1";
	}else{  $WHERE[] = "jugadores.suspendido = 0"; }
	
	if ($_REQUEST["status3"] == "on") {
		$WHERE[] = "jugadores.inactivo = 1";
	}else{  $WHERE[] = "jugadores.inactivo = 0"; }
	
	if ($_REQUEST["status4"] == "on") {
		$WHERE[] = "jugadores.muy_inactivo = 1";
	}else{  $WHERE[] = "jugadores.muy_inactivo = 0"; }
	
	if ($_REQUEST["rank"] > 0) $WHERE[] = "(jugadores.ranking <= ".$_REQUEST["rank"]." AND jugadores.ranking != 0) ";

	$query = "FROM uni".$_REQUEST["universo"]." AS universo LEFT JOIN uni".$_REQUEST["universo"]."_jugadores AS jugadores ON (universo.jugador = jugadores.id) LEFT JOIN uni".$_REQUEST["universo"]."_alianzas AS alianzas ON (jugadores.alianza = alianzas.id) ";
	if (sizeof($WHERE) > 0){
		$query .= " WHERE ";
		foreach($WHERE as $where_clause){
			$query .= $where_clause." ";
			if ($WHERE[count($WHERE) - 1] != $where_clause) $query .= " AND ";
		}
	}
	
	if (isset($_REQUEST["sort"])){
		$query .= " ORDER BY ";
		switch($_REQUEST["sort"]){
			case 0: $query .= "galaxia, sistema, planeta"; break;
			case 1: $query .= "jugadores.nombre"; break;
			case 2: $query .= "alianzas.nombre"; break;
		}
		if (isset($_REQUEST["sortorder"])){
			switch($_REQUEST["sortorder"]){
				case 0: $query .= " ASC "; break;
				case 1: $query .= " DESC "; break;
			}
		}
	}

	if (isset($_REQUEST["page"])) $page = $_REQUEST["page"]; else $page = 1;
	$limit .= " LIMIT ".(($page - 1) * $_REQUEST["entries"]).",".$_REQUEST["entries"];

	$resultados = $db->db_query("SELECT 	galaxia, sistema, planeta, nombre_planeta, luna,
						jugadores.nombre AS jugador_nombre,
						jugadores.ranking AS jugador_ranking,
						inactivo, muy_inactivo, vacaciones, suspendido,
						alianzas.nombre AS alianza_nombre,
						alianzas.posicion AS alianza_ranking,
						alianzas.miembros AS alianza_miembros,
						alianzas.url AS alianza_url,
						timestamp 
						".$query.$limit, true);

	if (empty($_REQUEST["num_resultados"])){					
		$num_resultados = $db->db_query("SELECT count(*) AS cantidad ".$query, true);
		$num_resultados = $num_resultados[0]["cantidad"];
		$_REQUEST["num_resultados"] = $num_resultados;
	}else $num_resultados = $_REQUEST["num_resultados"];

	if (!empty($resultados)){
	    	start_table($num_resultados, $page);
		foreach($resultados as $resultado) display_result($resultado);
		end_table($num_resultados, $page);
	}else echo '<div align="center">Sin resultados</div>';
}
$db->db_disconnect();
?>
		<script language="JavaScript" src="js/tooltip.js"></script>
	</body>
</html>

