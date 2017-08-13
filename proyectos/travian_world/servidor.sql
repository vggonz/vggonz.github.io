CREATE TABLE servidor (
  fecha date NOT NULL default '0000-00-00',
  id int(9) unsigned NOT NULL default '0',
  x smallint(3) NOT NULL default '0',
  y smallint(3) NOT NULL default '0',
  vid tinyint(1) unsigned NOT NULL default '0',
  did int(9) unsigned NOT NULL default '0',
  dorfname varchar(20) NOT NULL default '',
  uid int(9) NOT NULL default '0',
  spieler varchar(20) NOT NULL default '',
  aid int(9) unsigned NOT NULL default '0',
  allianz varchar(8) NOT NULL default '',
  einwohner smallint(5) unsigned NOT NULL default '0',
  UNIQUE KEY indice (fecha,id),
  KEY uid (uid),
  KEY id (id),
  KEY aid (aid),
  KEY did (did)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
