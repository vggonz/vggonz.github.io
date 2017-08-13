<?php

// Configuración
require_once("conf.php");

// Recoge los 3 parámetros
$gid = $_REQUEST["gravatar_id"];
$size = $_REQUEST["size"];
$default = $_REQUEST["default"];

// Si no hay tamaño o no es válido se especifica el máximo autorizado
if ($size == '' || !is_numeric($size) || $size > MAX_SIZE || $size < 1) $size = MAX_SIZE;
// Se crean las rutas a los ficheros base y derivados en cache
$cache_file = $cache_dir.DIRECTORY_SEPARATOR.$gid."_$size";
$pool_file = $pool_dir.DIRECTORY_SEPARATOR.$gid;

// Si el fichero existe en cache
if (file_exists($cache_file)){
	// Comprueba su fecha
	not_modified_since($cache_file);
	$img_info = getimagesize($cache_file);
	header("Content-Type: ".$img_info['mime']);
	readfile($cache_file);
// Si está dado de alta en el servicio pero nunca se ha solicitado ese tamaño
}else if (file_exists($pool_file)){
	// Especifica la fecha de creacion
	header("Last-Modified: ".gmt_string(time()));
	$type = create_cache($pool_file, $cache_file, $size);
	if ($type != NULL){
		header("Content-Type: $type");
		readfile($cache_file);
	}else try_default($size);
// Si no se tiene constancia de un avatar asociado se devuelve la imagen por defecto
}else try_default($size);

function try_default($size){
	global $default, $default_avatar;
	global $cache_dir;

	if ($default == ''){
		$cache_file = $cache_dir.DIRECTORY_SEPARATOR."default_$size";
		if (file_exists($cache_file)){
			$img_info = getimagesize($cache_file);
			$type = $img_info['mime'];
		}else $type = create_cache($default_avatar, $cache_file, $size);
		if ($type != NULL){
			header("Content-Type: $type");
			readfile($cache_file);
		}else header("HTTP/1.1 500 Internal Server Error");
	}else header("Location: ".urldecode($default));
}

function create_cache($pool_file, $cache_file, $size){
	global $mod;

	$img_info = getimagesize($pool_file);
	// Si el tamaño de la imagen base es igual al solicitado no hace falta realizar
	// procesamiento gráfico
	if ($img_info[0] == $size && $img_info[1] == $size){
		// En entornos Unix se pueden aprovechar los enlaces simbólicos para ahorrar espacio
		if (function_exists("symlink")) symlink($pool_file, $cache_file);
		else copy($pool_file, $cache_file);
		$type = $img_info['mime'];
	}else{
		// Según el formato base se utiliza una función u otra para crear la derivada
		switch($img_info['mime']){
			case 'image/gif': $img_fnc = "imagecreatefromgif"; $cache_type = "gif"; break;
			case 'image/jpeg': $img_fnc = "imagecreatefromjpeg"; $cache_type = "jpeg"; break;
			case 'image/png': $img_fnc = "imagecreatefrompng"; $cache_type = "png"; break;
			default: $error = true;
		}
		if (!$error){
			// Crea una nueva imagen y la escala al tamaño solicitado
			$imagen = $img_fnc($pool_file);
			$thumb = imagecreatetruecolor($size, $size);
			$background = imagecolorallocate($thumb, 0, 0, 0);
			ImageColorTransparent($thumb, $background);
			imagealphablending($thumb, false);
			imagecopyresized($thumb, $imagen, 0, 0, 0, 0, $size, $size, $img_info[0], $img_info[1]);
			$img_fnc = "image$cache_type";
			// La guarda en caché
			$img_fnc($thumb, $cache_file);
			chmod($cache_file, $mod);
			imagedestroy($imagen);
			imagedestroy($thumb);

			$type = "image/$cache_type";
		}else $type = NULL;
	}
	return $type;
}

/**
 * Genera una cadena de texto representando una fecha en formato HTTP-Date
 * 
 * Params:
 *	$tiempo: Fecha en formato Unix
 *
 * Returns:
 *	Cadena de texto que representa la fecha en formato HTTP-Date
 */
function gmt_string($tiempo){ return (gmdate("D, d M Y H:i:s", $tiempo) . " GMT"); }

/**
 * Comprueba la fecha de un fichero dado con la cabecera "If-Modified-Since" si existe. Si 
 * la fecha del fichero es menor se informa de que no ha habido cambios y aborta, en caso
 * contrario asigna la cabecera "Last-Modified"
 *
 * Params:
 *	$file: Ruta del fichero con el que comprobar su fecha
 */
function not_modified_since($file){
	$headers = apache_request_headers();
	$if_modified_since = preg_replace('/;.*$/', '', $headers['If-Modified-Since']);
	clearstatcache();
	$filetime = @filemtime($file);

	if ($if_modified_since && (strtotime($if_modified_since) >= $filetime)){
		header("HTTP/1.1 304 Not Modified");
		exit;
	}else header("Last-Modified: ".gmt_string($filetime));
}

?>
