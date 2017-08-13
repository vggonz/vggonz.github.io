CREATE TABLE `uni_jugadores` (
  `id` mediumint(8) unsigned NOT NULL default '0',
  `nombre` varchar(50) collate latin1_spanish_ci NOT NULL default '',
  `ranking` smallint(5) unsigned default NULL,
  `alianza` smallint(5) unsigned default NULL,
  `inactivo` tinyint(1) default '0',
  `muy_inactivo` tinyint(1) default '0',
  `vacaciones` tinyint(1) default '0',
  `suspendido` tinyint(1) default '0',
  PRIMARY KEY  (`id`),
  KEY `alianza` (`alianza`),
  KEY `nombre` (`nombre`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
