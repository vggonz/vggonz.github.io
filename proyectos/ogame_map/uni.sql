CREATE TABLE `uni` (
  `galaxia` tinyint(4) NOT NULL default '0',
  `sistema` smallint(6) NOT NULL default '0',
  `planeta` tinyint(4) NOT NULL default '0',
  `nombre_planeta` varchar(50) collate latin1_spanish_ci NOT NULL default '',
  `luna` smallint(6) default NULL,
  `jugador` mediumint(6) unsigned NOT NULL default '0',
  `timestamp` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`galaxia`,`sistema`,`planeta`),
  KEY `jugador` (`jugador`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
