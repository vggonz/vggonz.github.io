CREATE TABLE `uni_alianzas` (
  `id` smallint(5) unsigned NOT NULL default '0',
  `nombre` varchar(50) collate latin1_spanish_ci NOT NULL default '',
  `posicion` smallint(5) unsigned default NULL,
  `miembros` smallint(5) unsigned NOT NULL default '0',
  `url` varchar(100) collate latin1_spanish_ci default NULL,
  PRIMARY KEY  (`id`),
  KEY `nombre` (`nombre`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
