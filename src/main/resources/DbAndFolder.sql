CREATE DATABASE  IF NOT EXISTS `budget-app`;
USE `budget-app`;

--
-- Dropping tables
--
DROP TABLE IF EXISTS `expense`;
DROP TABLE IF EXISTS `folder`;
DROP TABLE IF EXISTS `time_period`;

--
-- Table structure for table `table`
--

CREATE TABLE `time_period` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME,
    `updated_at` DATETIME,
    `month` varchar(15),
    `year` int,
    PRIMARY KEY (`id`)
);

CREATE TABLE `folder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME,
  `updated_at` DATETIME,
  `name` varchar(45),
  `amount` decimal,
  `balance` decimal,
  `time_period_id` int,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`time_period_id`) REFERENCES time_period(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Data for table `employee`
--

-- INSERT INTO `folder` VALUES 
-- (1,'Tithe',860, 860),
--    (2,'Misc', 200, 200);
    
--
-- Table structure for table `expense`
--

CREATE TABLE `expense` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME,
    `updated_at` DATETIME,
    `merchant` varchar(45),
    `amount` decimal,
    `folder_id` int(11),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`folder_id`) REFERENCES folder(`id`)
);

-- INSERT INTO `expense` (id, merchant, amount, folder_id) VALUES
	-- (1, 'Child Impact', 300, 1),
	-- (2, 'Newport SDA Church', '200', 1),
    -- (3, 'Bible App', '50', 1),
    -- (4, 'Baby Stuff', '50', 2),
    -- (5, 'Paper Towels', '15', 2),
    -- (6, 'Dollar General Snacks', '10', 2);
    

	

