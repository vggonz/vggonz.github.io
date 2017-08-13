<?php

// TODO: Permisos de las imagenes subidas

// Par�metros de configuraci�n
require_once("conf.php");

// Funciones auxiliares
require_once("lib.php");

// Extrae y prepara los 3 par�metros: correo, password y fichero subido
$correo = stripslashes(trim($_REQUEST["correo"]));
$md5_correo = md5($correo);
$password = stripslashes(trim($_REQUEST["password"]));
$md5_password = md5($password);
$file = $_FILES["file"];

// Si se ha rellenado alg�n par�metros
if ($correo || $password){

	// Se comprueba el estado de los par�metros
	if ($file == '' || $file['error'] == 4) $error = __("Debe seleccionar alg�n fichero");
	if ($password == '') $error = __("Debe introducir una contrase�a");
	if ($correo == '') $error = __("Debe introducir una direcci�n de correo");
	else if(!preg_match('/^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i', $correo)) $error = __("Direcci�n de correo no v�lida");;

	if (!$error){
		require_once("db_mysql.php");
		$db = new DB_Sql();
		$db->db_connect($db_url);
		// Comprueba si se trata de un registro o una actualizaci�n
		$result = $db->db_query("SELECT password FROM savatar WHERE email = '$md5_correo'", true);
		if (!empty($result)){
			if ($md5_password != $result[0]["password"]) $error = __("Contrase�a incorrecta");
		}else $nuevo = true;

		if (!$error){
			// Comprueba el estado del fichero subido
			if (filesize($file['tmp_name']) > (MAX_FILESIZE * 1024)) $error = __("La imagen no puede superar los %s kilobytes", array("%s" => MAX_FILESIZE));
			if ($file['error'] > 0) $error = __("Ha ocurrido alg�n error enviando el fichero");
			if (!$error){
				$img_info = getimagesize($file['tmp_name']);
				if ($img_info[0] > MAX_SIZE || $img_info[1] > MAX_SIZE) $error = __("La imagen debe tener un ancho y alto menor a %s p�xeles", array("%s" => MAX_SIZE));
				if ($img_info[0] != $img_info[1]) $error = __("La imagen debe ser cuadrada");
				switch($img_info['mime']){
					case 'image/gif': break;
					case 'image/jpeg': break;
					case 'image/png': break;
					default: $error = __("La imagen debe ser JPG, PNG o GIF");
				}
				if (!$error){
					mt_srand(time());
					$checksum = md5($correo.mt_rand());
					// Inserta o actualiza el nuevo avatar
					move_uploaded_file($file['tmp_name'], $pool_dir.DIRECTORY_SEPARATOR.$md5_correo."_$checksum");
					if ($nuevo){
						$db->db_query("INSERT IGNORE INTO savatar VALUES('$md5_correo', '$md5_password')");

						$url = explode('/', $_SERVER["SCRIPT_URI"]);
						array_pop($url);
						$url = join('/', $url);
						$url .= "/validate.php?gid=$md5_correo&checksum=$checksum";

						mail($correo, __("Alta en Savatar"), wordwrap(__("Hola!\n\nEsta direcci�n de correo (%a) ha sido usada para registrar una cuenta en Savatar.\nPara validar el registro simplemente haz click en %b\nSi no has solicitado estos datos y crees que puede ser un error, tan s�lo ign�ralos y borra el mensaje.\n\nGracias por registrarte.", array("%a" => $correo, "%b" => $url)), 70), "From: Savatar <$email_from>");
						$msg = __("Gracias. Por favor, haz click en el enlace del correo que recibir�s para completar el registro. No olvides revisar la carpeta de Spam.");
					}else{
						// Invalida las cache existentes basadas en la antigua imagen base
						foreach(glob($cache_dir.DIRECTORY_SEPARATOR.$md5_correo."*") as $cache_file) unlink($cache_file);
						$msg = __("Imagen almacenada con �xito para %s", array("%s" => $correo));
					}
				}
			}
			$db->db_disconnect();
		}
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>Savatar</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>
		<link href="style.css" rel="stylesheet" type="text/css"/>
		<script>
			function $(elem){ return document.getElementById(elem); }
			function toggle(elem){ 
				o = $(elem);
				if (o.style.display == 'none') o.style.display = ''; else o.style.display = 'none'; 
			}
		</script>
	</head>
	<body>
		<div id="login">
			<h1><a href=""><img src="logo.png" alt="Savatar" border="0"/></a></h1>
			<form enctype="multipart/form-data" method="POST" name="form">
				<p><label><?php echo __("Direcci�n de correo electr�nico"); ?><br/><input type="text" name="correo" value="<?php echo $correo; ?>"/></label></p>
				<p><label><?php echo __("Contrase�a"); ?><br/><input type="password" name="password"/></label></p>
				<p><label><?php echo __("Avatar"); ?><br/><input type="file" name="file" id="file"/></label></p>
				<?php if($error) echo "<div class='error'>$error</div>"; ?>
				<?php if($msg) echo "<div class='success'>$msg</div>"; ?>
				<p class="submit"><input type="submit" value="<?php echo __("Enviar �"); ?>"/></p>
			</form>
		</div>
		<div id="ayuda">
			<a href="javascript:void(0)" onclick="toggle('menu')"><?php ___("Ayuda"); ?></a>
			<div id="menu" style="display: none;">
				<a href="javascript:void(0)" onclick="toggle('menu')"><?php ___("Cerrar"); ?></a>
				<ul>
					<li><b><?php ___("Introducci�n"); ?></b><div id="ayudaitem"><?php ___("Savatar (<em><b>S</b>imple <b>avatar</b></em>) es un clon simplificado del conocido servicio web <a href='http://www.gravatar.com'>Gravatar</a>. Proporciona una imagen o avatar de hasta %sx%s p�xeles que aparece asociado a una direcci�n de correo, pudi�ndose utilizar en blogs, foros o cualquier otro sitio que implemente la interfaz de Gravatar.", array("%s" => MAX_SIZE)); ?></div></li>
					<li><b><?php ___("Funcionalidades"); ?></b><div id="ayudaitem"><?php ___("Savatar proporciona gratuitamente <b>un</b> avatar asociado a cada cuenta de correo. S�lo es necesario introducir la direcci�n de correo, una contrase�a y subir la imagen del avatar de un m�ximo de %sx%s p�xeles y %p kilobytes. Despu�s <b>debes validar tu cuenta</b> para probar que eres su aut�ntico due�o haciendo click en un enlace que recibir�s por correo.<br/>Actualizarlo es tan sencillo como volver a rellenar el formulario <b>con la misma contrase�a</b> que se us� en el registro.", array("%s" => MAX_SIZE, "%p" => MAX_FILESIZE)); ?></div></li>
					<li><b><?php ___("Uso"); ?></b><div id="ayudaitem"><?php ___('La interfaz es completamente compatible con <b>Gravatar</b> con la �nica diferencia de que no posee calificaci�n por contenido (par�metro &rating). Para solicitar un savatar s�lo apunta al generador de avatares con el <em>MD5</em> del correo electr�nico ubicado en <b>http://www.denibol.com/proyectos/savatar/avatar.php</b>.<p>M�s informaci�n sobre la interfaz en <a href="http://site.gravatar.com/site/implement">http://site.gravatar.com/site/implement</a></p>'); ?></div></li>
				</ul>
				<?php //___('<p>El c�digo fuente de la aplicaci�n puede descargarse <a href="savatar.tar.bz2">aqu�</a> (25 KB)</p>'); ?>
			</div>
		</div>
	</body>
</html>
