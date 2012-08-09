

/* Alter table in Second database */
alter table `soccer`.`coaches`, 
	change `ID` `ID` int(10) NOT NULL  auto_increment, 
	drop key `ID`,  type=MyISAM; 

/* Create table in Second database */
create table `soccer`.`playerhistory` ( 
	`ID` int(9) NOT NULL  DEFAULT '0' , 
	`YearID` varchar(4) NOT NULL   , 
	`SeasonID` varchar(10) NOT NULL   , 
	`Selected` char(1) NULL   , 
	`FirstName` varchar(30) NOT NULL   , 
	`LastName` varchar(30) NOT NULL   , 
	`Address` varchar(30) NOT NULL   , 
	`City` varchar(20) NOT NULL   , 
	`State` char(2) NOT NULL   , 
	`ZipCode` varchar(9) NOT NULL   , 
	`Sex` char(1) NULL   , 
	`BirthDate` date NULL   , 
	`Coach` varchar(30) NULL   , 
	`YearsPlayed` int(2) NULL   , 
	`LastyearPlayed` varchar(4) NULL   , 
	`LastSeasonPlayed` varchar(10) NULL   , 
	`LastYearEligible` varchar(4) NULL   , 
	`Phone` varchar(15) NULL   , 
	`LastGrade` char(2) NULL   , 
	`Speed_Rating` int(2) NULL   , 
	`Soccer_Rating` int(2) NULL   , 
	`Attitude_Rating` int(2) NULL   , 
	`Overall_Rating` int(2) NULL   , 
	`Comments` varchar(100) NULL   , 
	`Print` char(1) NULL   , 
	`Status` char(1) NULL   , 
	`Players_Comments` varchar(100) NULL   , 
	`Shirt_Size` char(3) NULL   , 
	`PayType` enum('NotPaid','Cash','Check','MoneyOrder','Reg-NoCharge','Reg-NoPay') NULL   , 
	`PayID` varchar(10) NULL   , 
	`PayAmount` decimal(6,2) NULL   , 
	`PayDate` date NULL   , 
	`AddDate` date NULL   , 
	`ChangeDate` date NULL   , 
	`WillCoach` char(1) NULL   , 
	`WillSponsor` char(1) NULL   , 
	`WillVolunteer` char(1) NULL   , 
	PRIMARY KEY (`ID`,`SeasonID`,`YearID`) 
)Type=InnoDB;