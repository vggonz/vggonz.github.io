<?php

// Funciones de acceso a BD
require_once('include/db_mysql.php');

// Parametros de configuracion
require_once('include/conf.php');

// Funcion que calcula el ID a partir de las coordenadas X e Y
function xy2id($x, $y){ return (3079 + ($x + 250) + (512 * abs($y - 250))); }

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

// Comprueba si una variable contiene un valor entero
function isint($x){ return (is_numeric($x) ? intval($x) == $x : false); }

// Calcula el ID de una casilla desplazada
function id_desp($id, $x, $y){ return xy2id(norm_coord(id2x($id) + $x), norm_coord(id2y($id) + $y)); }

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

// Conecta con la base de datos
$db = new DB_Sql();
$db->db_connect($db_url);

$expire = time() + (86400 * 30); // 30 dias
$parametros = array("server", "desp", "war", "user", "z");
foreach($parametros as $parametro){
	if (isset($_GET[$parametro])) $$parametro = $_GET[$parametro];
	else if (isset($_POST[$parametro])) $$parametro = $_POST[$parametro];
	else if (isset($_COOKIE[$parametro])) $$parametro = $_COOKIE[$parametro];

	if (isset($$parametro)){
		if (!get_magic_quotes_gpc()) $$parametro = addslashes($$parametro);

		if ($$parametro == ''){ unset($$parametro); setcookie($parametro, FALSE, $expire);
		}else{ setcookie($parametro, $$parametro, $expire); }
	}
}

// Si no hay definido un servidor, se coge uno por defecto
if (!isset($server)){
	$server_keys = array_keys($servers);
	$server = $server_keys[0];
	setcookie("server", $server, $expire);
}else if (!isset($servers[$server])){
	die("[ERROR] Servidor desconocido");
}

// Si estan definidas las coordenadas X e Y se obtiene el ID
if (isset($_REQUEST["xp"]) && isset($_REQUEST["yp"]) && isint($_REQUEST["xp"]) && isint($_REQUEST["yp"])){
	$xp = norm_coord($_REQUEST["xp"]); $yp = norm_coord($_REQUEST["yp"]);
	$z = xy2id($xp, $yp);
	setcookie("z", $z, $expire);
// Si esta definido el ID se obtienen las coordenadas X e Y
}else if(isset($z)){
	$xp = id2x($z);
	$yp = id2y($z);
// Si no hay coordenadas definidas por defecto muestra el origen (0, 0)
}else{
	$xp = 0; $yp = 0;
	$z = xy2id($xp, $yp);
	setcookie("z", $z, $expire);
}

// Desplazamiento por defecto a 1
if (!isset($desp) || !isint($desp) || !(intval($desp) > 1)){ $desp = 1; setcookie("desp", $desp, $expire); }

// Si no se ha especificado ni usuario ni alianza, aun se puede saber univocamente a partir del identificador de aldea
if(isset($_REQUEST["did"])){
	$resultados = $db->db_query("SELECT uid, aid FROM ".$servers[$server]." WHERE did=".$_REQUEST["did"]." ORDER BY fecha DESC LIMIT 1", true);
	$user = $resultados[0]["uid"];
	setcookie("user", $user, $expire);
	if ($resultados[0]["aid"] != 0) $ally = $resultados[0]["aid"];
// Si no se especifica la alianza, se puede averiguar a partir del ID de usuario
}else if (isset($user) && isint($user)){
	$resultados = $db->db_query("SELECT aid FROM ".$servers[$server]." WHERE uid=$user ORDER BY fecha DESC LIMIT 1", true);
	if ($resultados[0]["aid"] != 0) $ally = $resultados[0]["aid"];
}

/*
// Con capacidad computacional suficiente (e indices sobre los campos de texto), 
// se podria coger no solo los IDs, sino tb los nombres directamente
if (isset($user) && !isint($user)){
	$resultados = $db->db_query("SELECT uid FROM ".$servers[$server]." WHERE spieler LIKE '%$user%' ORDER BY fecha DESC LIMT 1", true);
	$user = $resultados[0]["uid"];
	setcookie("user", $user, $expire);
}
*/

// Consulta toda la informacion necesaria de las casillas visibles
for ($i = -6; $i <= 6; $i++){
        for ($j = -6; $j <= 6; $j++){
                $nuevo_id = id_desp($z, $i, $j);
                $ids[] = $nuevo_id;
        }
}
$ids = dividir_id($ids);
$data = array();
foreach($ids as $nuevos_ids){
        $resultados = $db->db_query("SELECT id, x, y, uid, spieler, dorfname, aid, allianz, einwohner FROM ".$servers[$server]." WHERE id BETWEEN ".min($nuevos_ids)." AND ".max($nuevos_ids)." AND fecha = (SELECT MAX(fecha) FROM ".$servers[$server].")", true);
        if (!empty($resultados)) foreach($resultados as $resultado) $data[$resultado["id"]] = $resultado;
}

?>
<html>
	<head>
		<title>Travian Map</title>
		<link rel=stylesheet type="text/css" href="css/style.css">
		<meta name="robots" content="noindex, nofollow">
		<script type=text/javascript>
			// Funcion extraida del juego original. Actualiza la tabla de informacion de una casilla
			function map(dorf, spieler, ew, ally, x, y){
				text_details = 'Detalles:';
				text_spieler = 'Jugadores:';
				text_einwohner = 'Habitantes:';
				text_allianz = 'Alianza:';

				document.getElementById('x').firstChild.nodeValue = x;
				document.getElementById('y').firstChild.nodeValue = y;
				myElement = document.getElementById("tb");
				if(myElement != null){
					if(ally == ''){ ally = '-'; }
					var tbt = "<table cellspacing='1' cellpadding='2' class='tbg f8'><tr><td class='rbg f8' colspan='2'></a>" + dorf + "</td></tr><tr><td width='45%' class='s7 f8'>" + text_spieler + "</td><td class='s7 f8'>" + spieler + "</td></tr><tr><td class='s7 f8'>" + text_einwohner + "</td><td class='s7 f8' id='ew'>" + ew + "</td></tr><tr><td class='s7 f8'>" + text_allianz + "</td><td class='s7 f8'>" + ally + "</td></tr></table>";
					var tbt2 = "<table class='f8' width='100%' cellspacing='1' cellpadding='2' bgcolor='#F0F0F0'><tr bgcolor='#FFFFFF'><td class='c b' colspan='2' align='center'></a>" + text_details + "</td></tr><tr bgcolor='#FFFFFF'><td width='45%' class='c s7'>" + text_spieler + "</td><td class='c s7'>-</td></tr><tr bgcolor='#FFFFFF'><td class='c s7'>" + text_einwohner + "</td><td class='c s7'>-</td></tr><tr bgcolor='#FFFFFF'><td class='c s7'>" + text_allianz + "</td><td class='c s7'>-</td></tr></table>";
					if(spieler != ''){ myElement.innerHTML = tbt; }else{ myElement.innerHTML = tbt2; }
				}
			}

			function x_y(x, y){
				document.getElementById('x').firstChild.nodeValue = x;
				document.getElementById('y').firstChild.nodeValue = y;
			}

			// Imagenes para el boton de OK
			/*
			ok1 = "img/ok1.gif";
			ok2 = "img/ok2.gif";
			ok3 = "img/ok3.gif";
			*/
			ok1 = "http://s2.travian.net/img/es/b/ok1.gif";
			ok2 = "http://s2.travian.net/img/es/b/ok2.gif";
			ok3 = "http://s2.travian.net/img/es/b/ok3.gif";

			function abrir(url){
				if (opener == null){
					window.location.href = url;
				}else{
					opener.location.href = url;
					self.close();
				}
			}
		</script>
	</head>
	<body bgcolor="#D5F0AA" style="background:#D5F0AA">
		<div style="position:absolute; width:180px; height:80px; z-index:500; left:10px; top:410px;">
			<table align="center" cellspacing="0" cellpadding="3">
				<form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
				<tr>
					<td>
						<b>x</b> <input name="xp" value="<?php echo $xp; ?>" size="4" maxlength="4">
						<b>y</b> <input name="yp" value="<?php echo $yp; ?>" size="4" maxlength="4">
					</td>
				</tr>
				<tr>
					<td><b>Desp.</b> <input name="desp" value="<?php echo $desp; $desp++; ?>" size="2" maxlength="2"</td>
				</tr>
				<!--tr>
					<td>
						<b>Servidor</b> 
						<select name="server">
						<?php
							foreach($servers as $server_key => $server_item){
								print("<option value='$server_key'");
								if ($server == $server_key) echo 'selected';
								echo ">".$server_key;
							}
						?>
						</select>
					</td>
				</tr-->
				<tr>
					<td colspan="2">
						<nobr>
							<b><acronym title="Identificador de Usuario">UID</acronym></b> <input name="user" value="<?php echo $user; ?>" size="4" maxlength="6">
							<b><acronym title="Identificador de alianza en Guerra">WID</acronym></b> <input name="war" value="<?php echo $war; ?>" size="4" maxlength="6">
						</nobr>
					</td>
				</tr>
				<tr>
					<td><input type="image" value="ok" border="0" name="s1" src="http://s2.travian.net/img/es/b/ok1.gif" width="50" height="20" onMousedown="this.src=ok2" onMouseOver="this.src=ok3" onMouseUp="this.src=ok1" onMouseOut="this.src=ok1"></input></td>
				</tr>
				</form>
			</table>
		</div>
		<div style="position:absolute; width:200px; height:80px; z-index:500; left:10px; top:10px;">
			<table width="100%" cellspacing="0" cellpadding="0">
				<tr>
					<td width="30%"><h1>Mapa</h1></td>
					<td width="33%" align="right"><h1><nobr>(<span id="x"><?php echo $xp; ?></span></nobr></h1></td>
					<td width="4%" align="center"><h1>|</h1></td>
					<td width="33%" align="left"><h1><nobr><span id="y"><?php echo $yp; ?></span></span>)</h1></td>
				</tr>
			</table>
		</div>
		<div align="center" style="position:absolute; width:170px; height:80px; z-index:500; right:20px; top:20px;" id="tb">
			<table class='f8' width='100%' cellspacing='1' cellpadding='2' bgcolor='#F0F0F0'>
				<tr bgcolor='#FFFFFF'>
					<td class='c b' colspan='2' align='center'>Detalles:</td>
				</tr>
				<tr bgcolor='#FFFFFF'>
					<td width='45%' class='c s7'>Jugadores:</td>
					<td class='c s7'>-</td>
				</tr>
				<tr bgcolor='#FFFFFF'>
					<td class='c s7'>Habitantes:</td>
					<td class='c s7'>-</td>
				</tr>
				<tr bgcolor='#FFFFFF'>
					<td class='c s7'>Alianza:</td>
					<td class='c s7'>-</td>
				</tr>
			</table>
		</div>
		<div align="center" style="position:absolute; z-index:50; left:10px; top:0px;">
<?php
/*
Accidentes orograficos son tX.gif siendo X de 0 a 5

De 0 a 99 habitantes utiliza d0X.gif
De 100 a 249 habitantes es d1X.gif
De 250 a 499 habitantes es d2X.gif
De 500 habitantes en adelante usa d3X.gif
siendo X un codigo de colores entre 0 y 5 dependiendo de la afinidad de la aldea (2 para aldea generica)

Aldeas propias utilizan dX0.gif (amarillo)
Aldeas de coaliciones es dX1.gif (verde)
Aldeas de la alianza es dX3.gif (azul)
Aldeas sin ninguna relacion son dX2.gif (rojo)
Aldeas con las que se tiene PNA son dX5.gif (turquesa)
Aldeas con las que se esta en guerra usan dX4.gif (naranja)
*/
	$left = 0;
	$top = 220;
	for ($i = 0; $i < 13; $i++){
		for ($j = 0; $j < 13; $j++){
			$nuevo_id = id_desp($z, $j - 6, 6 - $i);
			if ($data[$nuevo_id]){
				$einwohner = $data[$nuevo_id]["einwohner"];
				$aid = $data[$nuevo_id]["aid"];
				$uid = $data[$nuevo_id]["uid"];

				if ($einwohner < 100) $h = 0;
				else if($einwohner < 250) $h = 1;
				else if($einwohner < 500) $h = 2;
				else $h = 3; 

				if (isset($user) && ($user == $uid)) $c = 0;
				else if (isset($ally) && ($aid == $ally)) $c = 3;
				else if (isset($war) && ($aid == $war)) $c = 4;
				else $c = 2;

//				$img = "img/d$h$c.gif";
				$img = "http://s2.travian.net/img/es/m/d$h$c.gif";
//			}else{ $img = "img/t0.gif"; }
			}else{ $img = "http://s2.travian.net/img/es/m/t0.gif"; }
			print('<img style="position:absolute; left:'.($left + (36 * $j)).'px; top:'.($top - (20 * $j)).'px" src="'.$img.'">');
		}
		$left += 37;
		$top += 20;
	}
?>
		</div>
		<map name="map2">
			<area href="<?php print $_SERVER["PHP_SELF"]."?z=".(id_desp($z, 0, $desp - 1)); ?>" coords="200,115,30" shape="circle" title="Norte">
			<area href="<?php print $_SERVER["PHP_SELF"]."?z=".(id_desp($z, $desp - 1, 0)); ?>" coords="762,115,30" shape="circle" title="Este">
			<area href="<?php print $_SERVER["PHP_SELF"]."?z=".(id_desp($z, 0, 1 - $desp)); ?>" coords="770,430,30" shape="circle" title="Sur">
			<area href="<?php print $_SERVER["PHP_SELF"]."?z=".(id_desp($z, 1 - $desp, 0)); ?>" coords="210,430,30" shape="circle" title="Oeste">
<?php
	$a = 10; $b = 273; $c = 46; $d = 253; $e = 83; $f = 273; $g = 46; $h = 293;
	for ($i = 0; $i < 13; $i++){
		for ($j = 0; $j < 13; $j++){
			$coords = ($a + (36 * $j)).','.($b - (20 * $j)).','.($c + (36 * $j)).','.($d - (20 * $j)).','.($e + (36 * $j)).','.($f - (20 * $j)).','.($g + (36 * $j)).','.($h - (20 * $j));
			$nuevo_id = id_desp($z, $j - 6, 6 - $i);
			if ($data[$nuevo_id]){
				print("<area href='javascript:void(0)' onclick='abrir(\"http://$server/karte.php?d=$nuevo_id\")' coords=\"$coords\" shape=\"poly\" onMouseOver=\"map('".$data[$nuevo_id]["dorfname"]."','".$data[$nuevo_id]["spieler"]."','".$data[$nuevo_id]["einwohner"]."','".$data[$nuevo_id]["allianz"]."','".$data[$nuevo_id]["x"]."','".$data[$nuevo_id]["y"]."')\" onMouseOut=\"map('','','','','$xp','$yp')\">");
			}else{
				print('<area href="javascript:void(0)" onclick="abrir(\'http://'.$server.'/karte.php?d='.$nuevo_id.'\'" coords="'.$coords.'" shape="poly" onMouseOver="x_y(\''.id2x($nuevo_id).'\',\''.id2y($nuevo_id).'\')" onMouseOut="x_y(\''.$xp.'\',\''.$yp.'\')">');
			}
/* 
Los accidentes orograficos tendrian un enlace como este
<area nohref coords="'.$coords.'" shape="poly" onMouseOver="x_y(\''.$x.'\',\''.$y.'\')" onMouseOut="x_y(\''.$xp.'\',\''.$yp.'\')">
*/
		}
		$a += 37; $b += 20; 
		$c += 37; $d += 20;
		$e += 37; $f += 20;
		$g += 37; $h += 20;
	}
?>		
		</map>
		<img style="position:absolute; width:975px; height:550px; z-index:400; left:0px; top:0px;" usemap="#map2" src="http://s2.travian.net/img/es/m/bg_xxl.gif" border="0">
	</body>
</html>
