<?php

define("pool_dir", "/var/www/proyectos/savatar2/pool");
define("cache_dir", "/var/www/proyectos/savatar2/cache");
define("defaut_avatar_path", "/var/www/proyectos/savatar2/default.png");
define("file_mod", 0600);

$conf['max_avatar_width'] = 80;
$conf['max_avatar_height'] = 80;

$conf['max_uploaded_width'] = 640;
$conf['max_uploaded_height'] = 480;
$conf['max_uploaded_size'] = 100 * 1024; // filesize - 100KB

$conf['max_num_avatares'] = 3;
$conf['max_num_premium_avatares'] = -1;

$conf['db_url'] = "mysql://usuario:password@localhost/savatar2";
$conf['email_from'] = "savatar@denibol.com";
$conf['email_user_from'] = "Savatar Team";

$conf['max_wait_time'] = 60 * 60; // 1 hora en segundos

?>
