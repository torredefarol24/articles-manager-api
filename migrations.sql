-- Adminer 4.8.1 MySQL 5.7.44 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `articleId` int(255) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
  `title` char(100) NOT NULL COMMENT 'heading or title for the article',
  `content` text NOT NULL COMMENT 'article content',
  `status` enum('pending','published','rejected') NOT NULL DEFAULT 'pending' COMMENT 'status',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'time of creation',
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ownerId` int(10) unsigned NOT NULL COMMENT 'creator / user of article',
  PRIMARY KEY (`articleId`),
  KEY `ownerId` (`ownerId`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Articles created by users';

INSERT INTO `articles` (`articleId`, `title`, `content`, `status`, `createdAt`, `updatedAt`, `ownerId`) VALUES
(24,	'another title1',	'the content1',	'published',	'2023-11-19 14:30:01',	'2023-11-19 14:30:01',	2),
(25,	'another title1',	'the content1',	'published',	'2023-11-20 05:39:54',	'2023-11-19 14:30:04',	3),
(26,	'another title1',	'the content1',	'published',	'2023-11-19 14:30:08',	'2023-11-19 14:30:08',	2),
(27,	'another title1',	'the content1',	'rejected',	'2023-11-20 15:44:34',	'2023-11-20 15:44:34',	3),
(28,	'another title1',	'the content1',	'published',	'2023-11-19 14:30:15',	'2023-11-19 14:30:15',	2),
(29,	'another title1',	'the content1',	'published',	'2023-11-19 14:30:19',	'2023-11-19 14:30:19',	2),
(30,	'another title1',	'the content1',	'published',	'2023-11-20 17:10:59',	'2023-11-20 17:10:59',	2),
(31,	'another title1',	'the content1',	'published',	'2023-11-20 06:11:12',	'2023-11-19 14:29:53',	9),
(32,	'another title1',	'the content1',	'pending',	'2023-11-20 15:45:02',	'2023-11-20 15:45:02',	9),
(33,	'another title1',	'the content1',	'published',	'2023-11-20 06:10:53',	'2023-11-19 14:29:54',	9),
(34,	'another title1',	'the content1',	'pending',	'2023-11-20 05:40:27',	'2023-11-19 14:30:42',	9),
(35,	'another title1',	'the content1',	'pending',	'2023-11-19 14:30:42',	'2023-11-19 14:30:42',	2),
(36,	'another title1',	'the content1',	'published',	'2023-11-20 15:44:49',	'2023-11-20 15:44:49',	2),
(37,	'another title1',	'the content1',	'rejected',	'2023-11-19 14:31:20',	'2023-11-19 14:30:44',	2),
(38,	'another title1',	'the content1',	'published',	'2023-11-20 06:10:46',	'2023-11-19 14:30:44',	17),
(39,	'another title1',	'the content1',	'pending',	'2023-11-20 06:10:49',	'2023-11-19 14:30:45',	17),
(40,	'another title1',	'the content1',	'published',	'2023-11-20 06:11:47',	'2023-11-19 14:30:45',	17),
(41,	'another title1',	'the content1',	'published',	'2023-11-20 06:11:43',	'2023-11-19 15:41:21',	17),
(42,	'another title2',	'the content1',	'pending',	'2023-11-20 04:48:33',	'2023-11-20 04:48:33',	2),
(45,	'TEST CONTENT',	'ANOTHER TEST',	'pending',	'2023-11-20 12:06:49',	'2023-11-20 12:06:29',	2),
(46,	'The title updated',	'So did the content',	'pending',	'2023-11-20 13:11:17',	'2023-11-20 13:11:17',	2);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userId` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key ',
  `username` varchar(255) NOT NULL COMMENT 'username',
  `type` enum('admin','content-creator') NOT NULL COMMENT 'user type',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'time of creation',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Users entity';

INSERT INTO `users` (`userId`, `username`, `type`, `createdAt`) VALUES
(1,	'harry',	'admin',	'2023-11-16 13:26:11'),
(2,	'john',	'content-creator',	'2023-11-16 13:25:49'),
(3,	'peter',	'content-creator',	'2023-11-16 13:25:54'),
(4,	'donald',	'admin',	'2023-11-16 13:26:03'),
(9,	'Clark',	'content-creator',	'2023-11-20 05:39:30'),
(14,	'mark',	'admin',	'2023-11-19 15:29:34'),
(17,	'harry',	'content-creator',	'2023-11-19 15:33:20'),
(18,	'john',	'admin',	'2023-11-19 15:34:34'),
(20,	'axiostest',	'admin',	'2023-11-20 12:01:48'),
(21,	'Clark11111',	'admin',	'2023-11-20 13:18:34');

-- 2023-11-20 17:14:04
