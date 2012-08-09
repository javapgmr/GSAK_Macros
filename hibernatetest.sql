-- MySQL dump 9.08
--
-- Host: localhost    Database: HibernateTest
---------------------------------------------------------
-- Server version	4.0.14-nt

--
-- Table structure for table 'member'
--

DROP TABLE IF EXISTS member;
CREATE TABLE member (
  ID int(10) NOT NULL auto_increment,
  FirstName varchar(30) default NULL,
  LastName varchar(30) default NULL,
  Address varchar(30) default NULL,
  City varchar(20) default NULL,
  State char(2) default NULL,
  ZipCode varchar(10) default NULL,
  Phone varchar(15) default NULL,
  Status char(1) default NULL,
  PRIMARY KEY  (ID)
) TYPE=MyISAM;

--
-- Dumping data for table 'member'
--


