<?php

// Funciones de acceso a base de datos
require_once('include/db_mysql.php');

// Configuracion: correspondencia entre servidores y tablas en la DB, URL de conexion a la BD y directorio temporal
require_once('include/conf.php');

// Conexion a la BD
$db = new DB_Sql();
$db->db_connect($db_url);

/*
   Los campos del fichero map.sql son:

   [0] ID_ALDEA
   [1] COORD_X
   [2] COORD_Y
   [3] RAZA
   [4] ID_CREACION_ALDEA
   [5] NOMBRE_ALDEA
   [6] ID_JUGADOR
   [7] NOMBRE_JUGADOR
   [8] ID_ALIANZA
   [9] NOMBRE_ALIANZA
   [10] HAB
 */

// Cada servidor tiene asignado una tabla en la BD
foreach($servers as $server => $table){
	print("Procesando el map.sql del servidor $server... ");
	// Descarga el fichero
	system("wget -q http://$server/map.sql -O $datadir/tmp.sql");
	clearstatcache();
	if (filesize("$datadir/tmp.sql") > 0) {
		// Vacia datos anteriores
		$db->db_query("TRUNCATE TABLE x_world");
		// Inserta los datos nuevos en una tabla temporal. 
		// Dejamos que el cliente de MySQL haga el trabajo sucio, ya que PHP falla mucho al parsear ficheros *muy* grandes
		system("mysql -u".$db->User." -p".$db->Password." ".$db->Database." < $datadir/tmp.sql");
		// Purga datos antiguos
		$db->db_query("DELETE FROM $table WHERE fecha <= (CURDATE() - INTERVAL 7 DAY)");
		// Copia y adapta la nueva informacion (solo agrega la fecha) a la tabla correspondiente
		$db->db_query("INSERT INTO $table 
				SELECT CURDATE(), id, x, y, vid, did, dorfname, uid, spieler, aid, allianz, einwohner 
				FROM x_world");
		// Vacia la tabla temporal
		$db->db_query("TRUNCATE TABLE x_world");
		print("OK!\n");
	}
	// Elimina el fichero origen
	unlink("$datadir/tmp.sql");
}

?>
