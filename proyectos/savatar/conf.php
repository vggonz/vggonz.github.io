<?php

// Tama�o m�ximo en p�xeles de los avatares, tanto ancho como alto
define("MAX_SIZE", 80);

// Tama�o m�ximo en kilobytes de los avatares
define("MAX_FILESIZE", 100);

// Directorio donde se guardar�n las im�genes maestro
$pool_dir = "/var/www/proyectos/savatar/pool";

// Directorio donde se ir�n almacenando los derivados en cache bajo demanda
$cache_dir = "/var/www/proyectos/savatar/cache";

// Cadena de conexi�n a la base de datos
$db_url = "mysql://usuario:password@localhost/savatar";

// Ruta al avatar por defecto
$default_avatar = "/var/www/proyectos/savatar/default.png";

// Remitente de los correos de validaci�n
$email_from = "savatar@denibol.com";

// Tiempo m�ximo de espera hasta validar
$max_wait_time = 3600; // 1 hora

// Permisos de acceso de los avatares creados
$mod = 0600;
?>
