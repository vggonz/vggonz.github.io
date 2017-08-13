DROP TABLE IF EXISTS `savatar`;
CREATE TABLE `savatar` (
  `email` varchar(35) NOT NULL,
  `password` varchar(35) NOT NULL,
  PRIMARY KEY  (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
