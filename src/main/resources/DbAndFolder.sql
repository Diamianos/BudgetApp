CREATE DATABASE  IF NOT EXISTS `budget-app`;
USE `budget-app`;

--
-- Dropping tables
--
DROP TABLE IF EXISTS `time_period`;
DROP TABLE IF EXISTS `expense`;
DROP TABLE IF EXISTS `sub_folder`;
DROP TABLE IF EXISTS `folder`;

--
-- Table structure for table `table`
--

CREATE TABLE `folder` (
                          `id` int(11) NOT NULL AUTO_INCREMENT,
                          `created_at` DATETIME,
                          `updated_at` DATETIME,
                          `name` varchar(45),
                          `amount` decimal,
                          `balance` decimal, 
                          `month_year_period` DATE,
                          PRIMARY KEY (`id`),
                          INDEX `month_year_period_idx` (month_year_period)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Data for table `folder`
--

INSERT INTO `folder` (name, amount, balance, month_year_period) VALUES
   ('Tithe',860, 860, "2023-11-01"),
   ('Emily',300, 300, "2023-11-01"),
   ('John',100, 100, "2023-11-01"),
   ('Isabella',100, 100, "2023-11-01"),
   ('Necessities', 200, 200, "2023-12-01"),
   ('Gas', 240, 240, "2023-12-01"),
   ('Car Maintenance', 150, 150, "2023-12-01"),
   ('Roth',100, 100, "2023-12-01");

--
-- Table structure for table `subfoler`
--

CREATE TABLE `sub_folder` (
                          `id` int(11) NOT NULL AUTO_INCREMENT,
                          `created_at` DATETIME,
                          `updated_at` DATETIME,
                          `name` varchar(45),
                          `amount` decimal,
                          `balance` decimal,
                          `month_period` ENUM('FIRST_HALF', 'SECOND_HALF'),
                          `description` varchar(1000),
                          `tags` JSON, 
                          `tags_complete` boolean,
                          `folder_id` int,
                          INDEX `folder_idx` (folder_id),
                          PRIMARY KEY (`id`),
                          CONSTRAINT `FK_FOLDER`
                          FOREIGN KEY (`folder_id`) 
                          REFERENCES `folder`(`id`) 
                          ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Data for table `sub_folder`
--

-- INSERT INTO `sub_folder` (name, amount, balance, month_period, description, tags_complete, folder_id) VALUES
-- ('Tithe',430, 430, 'FIRST_HALF', 'Tithe Folder', 0, 1),
--    ('Tithe',430, 430, 'SECOND_HALF', 'Tithe Folder', 0, 1),
--    ('Emily',150, 150, 'FIRST_HALF', 'Emily Folder', 0, 2),
--    ('Emily',150, 150, 'SECOND_HALF', 'Emily Folder', 0, 2),
--    ('John',100, 100, 'FIRST_HALF', 'John Folder', 0, 3),
--    ('Isabella',100, 100, 'SECOND_HALF', 'Isabella Folder', 0, 4);

--
-- Table structure for table `expense`
--

CREATE TABLE `expense` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME,
    `updated_at` DATETIME,
    `date_of_transaction` DATETIME,
    `merchant` varchar(45),
    `amount` decimal,
    `description` varchar(50),
    `sub_folder_id` int(11),
    INDEX `sub_folder_idx` (sub_folder_id),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`sub_folder_id`) REFERENCES sub_folder(`id`) ON DELETE CASCADE
);

-- INSERT INTO `expense` (date_of_transaction, merchant, amount, description, sub_folder_id) VALUES
-- ('2023-06-05 14:40:20', 'Child Impact', 300, 'New well', 1),
-- ('2023-06-05 14:40:20', 'Church', 200, 'Tithe offering', 2),
-- ('2023-06-05 14:40:20', 'Nail Salon', 60, 'Nails for trip', 3),
-- ('2023-06-05 14:40:20', 'Beach Body', 120, 'Supplements', 4),
-- ('2023-06-05 14:40:20', 'Access Point', 50, 'Ubiquiti Access point', 5),
-- ('2023-06-05 14:40:20', 'Lowes', 50, 'House items', 5),
-- ('2023-06-05 14:40:20', 'Dollywood Splash', 10, 'Ice cream', 6);
