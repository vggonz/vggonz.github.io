<?php

// Parámetros de configuración
require_once("conf.php");

require_once("db_mysql.php");
$db = new DB_Sql();
$db->db_connect($db_url);

foreach(glob($pool_dir.DIRECTORY_SEPARATOR."*_*") as $file){
	clearstatcache();
	$filetime = @filemtime($file);
	if (time() - $filetime > $max_wait_time){
		$filename = basename($file);
		preg_match('/([^_]*)_/', $filename, $md5);
		$db->db_query("DELETE FROM savatar WHERE email = '".$md5[1]."'");
		unlink($file);
	}
}
$db->db_disconnect();
?>
