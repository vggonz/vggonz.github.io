<?php

require_once("conf.php");
require_once("lib.php");

$gid = $_REQUEST["gid"];
$checksum = $_REQUEST["checksum"];

if ($gid == '' || $checksum == '') $error = __("Insuficientes parámetros");

if (!$error){
	$temp_file = $pool_dir.DIRECTORY_SEPARATOR.$gid."_$checksum";
	$pool_file = $pool_dir.DIRECTORY_SEPARATOR.$gid;

	if (file_exists($temp_file)){
		rename($temp_file, $pool_file);
		$msg = __("Gracias, su cuenta de correo ha sido verificada con éxito. Su avatar ya se encuentra disponible.");
	}else if (file_exists($pool_file)) $error = __("Esta cuenta ya ha sido verificada");
	else $error = __("Lo sentimos, la verificación no es correcta");
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
        <head>
                <title>Savatar</title>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>
                <link href="style.css" rel="stylesheet" type="text/css"/>
        </head>
        <body>
		<?php if($error) echo "<div class='error'>$error</div>"; ?>
		<?php if($msg) echo "<div class='success'>$msg</div>"; ?>
       </body>
</html>
