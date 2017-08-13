CREATE TABLE `servidor_r` (
  `id` mediumint(8) unsigned NOT NULL default '0',
  `madera` tinyint(3) unsigned NOT NULL default '0',
  `barro` tinyint(3) unsigned NOT NULL default '0',
  `hierro` tinyint(3) unsigned NOT NULL default '0',
  `cereal` tinyint(3) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
