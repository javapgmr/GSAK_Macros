/* 
SQLyog v3.61
Host - localhost : Database - soccer
**************************************************************
Server version 4.0.15-nt
*/

use `musicboosters`;

/*
Table struture for emailmessage
*/

drop table if exists `emailmessage`;
CREATE TABLE `emailmessage` (
  `ID` int(4) NOT NULL default '0',
  `Message` longtext,
  `Description` varchar(50) default NULL,
  `Subject` varchar(100) default NULL,
  PRIMARY KEY  (`ID`)
) TYPE=InnoDB;

/*
Table data for soccer.emailmessage
*/

INSERT INTO `emailmessage` VALUES 
(1,'Dear Parent,\r\n\r\nYou are receiving this message to confirm that the Kids and Kics Soccer Club does have \r\nyour childs registration form and it has been successfully processed.\r\n\r\nRegistration is still in progress and will be for the next several weeks.  If you have any \r\nquestions, please do not hesitate to contact us with them.  \r\n\r\nWe can be reached via email at:   kidsandkics@bigfoot.com\r\n\r\n     or via our phone number at:      (618) 281-3127.\r\n\r\nAs a reminder, our website is:        www.kidsandkics.com\r\n\r\nThanks for registering your child with Kids and Kics this season.\r\n\r\n\r\nSincerely, \r\n\r\nSteve Bromley\r\nSecretary\r\nKids and Kics Soccer Club','Player Notification Message','Registration status for: %NAME%'),
(2,'Dear Coach, \n\nThis EMail is to remind you that the pick night for those \ncoaches in divisions with multiple teams is on July 21st, \nat 7:30 at the Middle School.\n\nThanks.\n\nSteve 	','Coaches Notification for Pick','Pick Night notification'),
(3,'Dear Parent,\n\nYou are receiving this message to confirm that the Kids and Kics Soccer Club does have \nyour childs registration form and it has been successfully processed.\n\nYou should expect to hear from a coach in the next week or so. \n\nWe can be reached via email at:   kidsandkics@bigfoot.com	\n\n     or via our phone number at:      (618) 281-3127.\n\nAs a reminder, our website is:        www.kidsandkics.com\n\nThanks for registering your child with Kids and Kics this season.\n\n\nSincerely, \n\nSteve Bromley\nSecretary\nKids and Kics Soccer Club','Late Registration','Registration status for: %NAME%');

