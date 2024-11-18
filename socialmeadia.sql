-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 18, 2024 at 06:06 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `socialmeadia`
--

-- --------------------------------------------------------

--
-- Table structure for table `dashboard_data`
--

CREATE TABLE `dashboard_data` (
  `id` varchar(11) NOT NULL,
  `totalFollowers` varchar(255) DEFAULT NULL,
  `facebookHandle` varchar(255) DEFAULT NULL,
  `facebookFollowers` varchar(255) DEFAULT NULL,
  `facebookDelta` int(11) DEFAULT NULL,
  `twitterHandle` varchar(255) DEFAULT NULL,
  `twitterFollowers` varchar(255) DEFAULT NULL,
  `twitterDelta` int(11) DEFAULT NULL,
  `instagramHandle` varchar(255) DEFAULT NULL,
  `instagramFollowers` varchar(255) DEFAULT NULL,
  `instagramDelta` int(11) DEFAULT NULL,
  `youtubeHandle` varchar(255) DEFAULT NULL,
  `youtubeSubscribers` varchar(255) DEFAULT NULL,
  `youtubeDelta` int(11) DEFAULT NULL,
  `facebookPageViews` int(11) DEFAULT NULL,
  `facebookPageMovement` varchar(255) DEFAULT NULL,
  `twitterPageViews` int(11) DEFAULT NULL,
  `twitterPageMovement` varchar(255) DEFAULT NULL,
  `instagramPageViews` int(11) DEFAULT NULL,
  `instagramPageMovement` varchar(255) DEFAULT NULL,
  `youtubePageViews` int(11) DEFAULT NULL,
  `youtubePageMovement` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dashboard_data`
--

INSERT INTO `dashboard_data` (`id`, `totalFollowers`, `facebookHandle`, `facebookFollowers`, `facebookDelta`, `twitterHandle`, `twitterFollowers`, `twitterDelta`, `instagramHandle`, `instagramFollowers`, `instagramDelta`, `youtubeHandle`, `youtubeSubscribers`, `youtubeDelta`, `facebookPageViews`, `facebookPageMovement`, `twitterPageViews`, `twitterPageMovement`, `instagramPageViews`, `instagramPageMovement`, `youtubePageViews`, `youtubePageMovement`) VALUES
('admin', '2,00,000', 'coder', '30k', 110, 'Coder', '1.2K', 73, 'Coder', '185K', 600, 'Coder', '10.5K', 104, 153, '7%', 788, '233%', 7894, '4311%', 450, '62%'),
('manusagar', '180000', 'social_star', '35000', 120, 'StarTweeter', '2100', 85, 'InstaFame', '140000', 450, 'YTStar', '9700', 110, 200, '8%', 600, '250%', 8000, '3500%', 500, '65%'),
('Pavan', '150000', 'tech_guru', '25000', 95, 'Techie', '1400', 68, 'InstaTech', '160000', 500, 'YTTech', '8900', 98, 120, '5%', 560, '200%', 7200, '3000%', 380, '50%');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `userId` varchar(255) NOT NULL,
  `password` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`userId`, `password`) VALUES
('admin', 'admin'),
('manusagar', '12345678'),
('Pavan', '87654321');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dashboard_data`
--
ALTER TABLE `dashboard_data`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
