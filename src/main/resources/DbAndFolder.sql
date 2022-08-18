CREATE DATABASE  IF NOT EXISTS `budget-app`;
USE `budget-app`;

--
-- Table structure for table `budget-app`
--

DROP TABLE IF EXISTS `folder`;

CREATE TABLE `folder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `amount` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Data for table `employee`
--

INSERT INTO `folder` VALUES 
	(1,'Tithe',860)
	

