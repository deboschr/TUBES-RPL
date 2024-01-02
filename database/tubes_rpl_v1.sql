-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 02, 2024 at 02:23 AM
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
-- Database: `tubes_rpl_v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `grade`
--

CREATE TABLE `grade` (
  `id_grade` int(11) NOT NULL,
  `id_schedule` int(11) NOT NULL,
  `bap` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grade`
--

INSERT INTO `grade` (`id_grade`, `id_schedule`, `bap`) VALUES
(1, 1, NULL),
(2, 2, NULL),
(3, 3, NULL),
(4, 4, NULL),
(5, 5, NULL),
(6, 6, NULL),
(7, 7, NULL),
(8, 8, NULL),
(9, 9, NULL),
(10, 10, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `grade_component`
--

CREATE TABLE `grade_component` (
  `id_component` int(11) NOT NULL,
  `id_grade` int(11) NOT NULL,
  `lecturer_role` enum('Examiner Head','Examiner Team','Coordinator','Supervisor') DEFAULT NULL,
  `capaian_materi` float DEFAULT NULL,
  `penguasaan_materi` float DEFAULT NULL,
  `proses_bimbingan` float DEFAULT NULL,
  `presentasi` float DEFAULT NULL,
  `kedisiplinan` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grade_component`
--

INSERT INTO `grade_component` (`id_component`, `id_grade`, `lecturer_role`, `capaian_materi`, `penguasaan_materi`, `proses_bimbingan`, `presentasi`, `kedisiplinan`) VALUES
(10, 5, 'Coordinator', 78, 55, 46, 91, 47),
(11, 5, 'Supervisor', 64, 88, 22, 45, 68),
(12, 5, 'Examiner Head', 45, 58, 74, 63, 26);

-- --------------------------------------------------------

--
-- Table structure for table `grade_component_coordinator`
--

CREATE TABLE `grade_component_coordinator` (
  `id_component` int(11) NOT NULL,
  `id_coordinator` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grade_component_coordinator`
--

INSERT INTO `grade_component_coordinator` (`id_component`, `id_coordinator`) VALUES
(10, '123456704C'),
(11, '123456705C'),
(12, '123456706C');

-- --------------------------------------------------------

--
-- Table structure for table `grade_component_examiner`
--

CREATE TABLE `grade_component_examiner` (
  `id_component` int(11) NOT NULL,
  `id_examiner` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grade_component_examiner`
--

INSERT INTO `grade_component_examiner` (`id_component`, `id_examiner`) VALUES
(10, '123456701E'),
(10, '123456702E'),
(12, '123456703E');

-- --------------------------------------------------------

--
-- Table structure for table `grade_component_supervisor`
--

CREATE TABLE `grade_component_supervisor` (
  `id_component` int(11) NOT NULL,
  `id_supervisor` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grade_component_supervisor`
--

INSERT INTO `grade_component_supervisor` (`id_component`, `id_supervisor`) VALUES
(10, '123456704S'),
(11, '123456706S'),
(12, '123456707S');

-- --------------------------------------------------------

--
-- Table structure for table `lecturer`
--

CREATE TABLE `lecturer` (
  `nik` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lecturer`
--

INSERT INTO `lecturer` (`nik`, `name`, `email`, `password`) VALUES
('00000000000', 'XXXXXXXXXXXX', 'xxxxxxxxxxxxxxxxx@gmail.com', 'XXXXXXXXXXXXXXX'),
('1111111111111111111', 'ZZZZZZZZZZZZZ', 'zzzzzzzzzzz@gmail.com', 'zzzzzzzzzzzzzzzzz'),
('123456701', 'Lionov, Ph.D.', 'lionov@unpar.ac.id', 'Lionov123'),
('123456702', 'Mariskha Tri Adithia, SSi, MSc, PDEng', 'mariskha@unpar.ac.id', 'Mariskha123'),
('123456703', 'Dr. Ir. Veronica Sri Moertini, MT', 'moertini@unpar.ac.id', 'Moertini123'),
('123456704', 'Dr.rer.nat. Cecilia Esti Nugraheni, ST, MT', 'cheni@unpar.ac.id', 'Cecilia123'),
('123456705', 'Keenan Adiwijaya Leman, S.T, M.T.', 'keenan.leman@unpar.ac.id', 'Keenan123'),
('123456706', 'Maria Veronica, S.T, M.T.', 'maria.veronica@unpar.ac.id', 'MariaVeronica123'),
('123456707', 'Raymond Chandra Putra, S.T., M.T.', 'raymond.chandra@unpar.ac.id', 'Raymond123'),
('123456708', 'Kristopher David Harjono M.T.', 'kristopher.h@unpar.ac.id', 'Kristopher123'),
('123456709', 'Husnul Hakim, S.Kom., M.T.', 'husnulhakim@unpar.ac.id', 'Husnul123'),
('123456710', 'Pascal Alfadian Nugroho, S.Kom, M.Comp', 'pascal@unpar.ac.id', 'Pascal123');

-- --------------------------------------------------------

--
-- Table structure for table `lecturer_coordinator`
--

CREATE TABLE `lecturer_coordinator` (
  `id_coordinator` varchar(20) NOT NULL,
  `nik` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lecturer_coordinator`
--

INSERT INTO `lecturer_coordinator` (`id_coordinator`, `nik`) VALUES
('00000000000C', '00000000000'),
('1111111111111111111C', '1111111111111111111'),
('123456704C', '123456704'),
('123456705C', '123456705'),
('123456706C', '123456706');

-- --------------------------------------------------------

--
-- Table structure for table `lecturer_examiner`
--

CREATE TABLE `lecturer_examiner` (
  `id_examiner` varchar(20) NOT NULL,
  `nik` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lecturer_examiner`
--

INSERT INTO `lecturer_examiner` (`id_examiner`, `nik`) VALUES
('123456701E', '123456701'),
('123456702E', '123456702'),
('123456703E', '123456703'),
('123456704E', '123456704');

-- --------------------------------------------------------

--
-- Table structure for table `lecturer_supervisor`
--

CREATE TABLE `lecturer_supervisor` (
  `id_supervisor` varchar(20) NOT NULL,
  `nik` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lecturer_supervisor`
--

INSERT INTO `lecturer_supervisor` (`id_supervisor`, `nik`) VALUES
('123456704S', '123456704'),
('123456706S', '123456706'),
('123456707S', '123456707'),
('123456708S', '123456708'),
('123456709S', '123456709'),
('123456710S', '123456710');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id_schedule` int(11) NOT NULL,
  `id_coordinator` varchar(20) NOT NULL,
  `npm` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `no_room` varchar(20) NOT NULL,
  `thesis_phase` enum('thesis-1','thesis-2') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id_schedule`, `id_coordinator`, `npm`, `date`, `time`, `no_room`, `thesis_phase`) VALUES
(1, '123456704C', '6182001061', '2024-01-13', '09:00:00', 'G09R01', 'thesis-1'),
(2, '123456705C', '6182001062', '2024-02-13', '10:00:00', 'G09R02', 'thesis-1'),
(3, '123456706C', '6182001063', '2024-03-13', '00:00:00', 'G09R03', 'thesis-1'),
(4, '123456704C', '6182001064', '2024-04-13', '00:00:00', 'G09R04', 'thesis-1'),
(5, '123456705C', '6182001065', '2024-04-13', '00:00:00', 'G09R05', 'thesis-1'),
(6, '123456706C', '6182001066', '2024-05-13', '00:00:00', 'G09R01', 'thesis-1'),
(7, '123456704C', '6182001067', '2024-06-13', '00:00:00', 'G09R02', 'thesis-1'),
(8, '123456705C', '6182001061', '2024-07-13', '00:00:00', 'G09R03', 'thesis-1'),
(9, '123456706C', '6182001062', '2024-08-13', '00:00:00', 'G09R04', 'thesis-1'),
(10, '123456704C', '6182001064', '2024-09-11', '20:00:00', 'G09R006', 'thesis-2'),
(18, '123456705C', '6182001061', '2023-12-15', '07:28:00', 'vvc', 'thesis-1'),
(19, '123456705C', '6182001066', '2024-05-31', '21:18:00', 'XXXXXXXXXXXXX', 'thesis-2');

-- --------------------------------------------------------

--
-- Table structure for table `schedule_examiner`
--

CREATE TABLE `schedule_examiner` (
  `id_schedule` int(11) NOT NULL,
  `id_examiner` varchar(20) NOT NULL,
  `examiner_role` enum('head','team') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule_examiner`
--

INSERT INTO `schedule_examiner` (`id_schedule`, `id_examiner`, `examiner_role`) VALUES
(10, '123456701E', 'head'),
(10, '123456702E', 'team'),
(18, '123456702E', 'head'),
(19, '123456702E', 'head'),
(19, '123456704E', 'team');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `npm` varchar(20) NOT NULL,
  `id_supervisor` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `thesis_topic` varchar(100) NOT NULL,
  `study_program` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`npm`, `id_supervisor`, `name`, `email`, `password`, `thesis_topic`, `study_program`) VALUES
('6182001061', '123456708S', 'Ade Rimbo Spencher', '6182001060@student.unpar.ac.id', '6182001061PS', 'Otomatisasi Pergerakan Tangan Menggunakan Algoritma Brute Force', 'Informatic'),
('6182001062', '123456706S', 'Debo Spencher', '6182001062@student.unpar.ac.id', '6182001062PS', 'Mencari Gebetan dengan Local Search', 'Law'),
('6182001063', '123456707S', 'Jake Spencher', '6182001063@student.unpar.ac.id', '6182001063PS', 'Analisis Kepatuhan Pasangan dengan Bantuan Stella Apel', 'Economic'),
('6182001064', '123456708S', 'Yujiro Hanma', '6182001064@student.unpar.ac.id', '6182001064PS', 'Meja Hitam Kos Q\'Ta', 'Informatic'),
('6182001065', '123456709S', 'Baki Hanma', '6182001065@student.unpar.ac.id', '6182001065PS', 'Mencari dan Mengahalahkan Bapak', 'Law'),
('6182001066', '123456710S', 'Kaoru Hanayama', '6182001066@student.unpar.ac.id', '6182001066PS', 'Menghindari Hanma', 'Economic'),
('6182001067', '123456704S', 'Biscuit Oliva', '6182001067@student.unpar.ac.id', '6182001067PS', 'Menembus Ketidah Tahuan Sehinga Benar-benar Tidak Tahu', 'Informatic');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`id_grade`),
  ADD KEY `id_schedule` (`id_schedule`);

--
-- Indexes for table `grade_component`
--
ALTER TABLE `grade_component`
  ADD PRIMARY KEY (`id_component`),
  ADD KEY `id_grade` (`id_grade`);

--
-- Indexes for table `grade_component_coordinator`
--
ALTER TABLE `grade_component_coordinator`
  ADD PRIMARY KEY (`id_component`,`id_coordinator`),
  ADD KEY `id_coordinator` (`id_coordinator`);

--
-- Indexes for table `grade_component_examiner`
--
ALTER TABLE `grade_component_examiner`
  ADD PRIMARY KEY (`id_component`,`id_examiner`),
  ADD KEY `id_examiner` (`id_examiner`);

--
-- Indexes for table `grade_component_supervisor`
--
ALTER TABLE `grade_component_supervisor`
  ADD PRIMARY KEY (`id_component`,`id_supervisor`),
  ADD KEY `id_supervisor` (`id_supervisor`);

--
-- Indexes for table `lecturer`
--
ALTER TABLE `lecturer`
  ADD PRIMARY KEY (`nik`);

--
-- Indexes for table `lecturer_coordinator`
--
ALTER TABLE `lecturer_coordinator`
  ADD PRIMARY KEY (`id_coordinator`),
  ADD KEY `nik` (`nik`);

--
-- Indexes for table `lecturer_examiner`
--
ALTER TABLE `lecturer_examiner`
  ADD PRIMARY KEY (`id_examiner`),
  ADD KEY `nik` (`nik`);

--
-- Indexes for table `lecturer_supervisor`
--
ALTER TABLE `lecturer_supervisor`
  ADD PRIMARY KEY (`id_supervisor`),
  ADD KEY `nik` (`nik`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id_schedule`),
  ADD KEY `npm` (`npm`),
  ADD KEY `id_coordinator` (`id_coordinator`);

--
-- Indexes for table `schedule_examiner`
--
ALTER TABLE `schedule_examiner`
  ADD PRIMARY KEY (`id_schedule`,`id_examiner`),
  ADD KEY `id_examiner` (`id_examiner`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`npm`),
  ADD KEY `id_supervisor` (`id_supervisor`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `grade`
--
ALTER TABLE `grade`
  MODIFY `id_grade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `grade_component`
--
ALTER TABLE `grade_component`
  MODIFY `id_component` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id_schedule` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `grade`
--
ALTER TABLE `grade`
  ADD CONSTRAINT `grade_ibfk_1` FOREIGN KEY (`id_schedule`) REFERENCES `schedule` (`id_schedule`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `grade_component`
--
ALTER TABLE `grade_component`
  ADD CONSTRAINT `grade_component_ibfk_1` FOREIGN KEY (`id_grade`) REFERENCES `grade` (`id_grade`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `grade_component_coordinator`
--
ALTER TABLE `grade_component_coordinator`
  ADD CONSTRAINT `grade_component_coordinator_ibfk_1` FOREIGN KEY (`id_component`) REFERENCES `grade_component` (`id_component`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `grade_component_coordinator_ibfk_2` FOREIGN KEY (`id_coordinator`) REFERENCES `lecturer_coordinator` (`id_coordinator`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `grade_component_examiner`
--
ALTER TABLE `grade_component_examiner`
  ADD CONSTRAINT `grade_component_examiner_ibfk_1` FOREIGN KEY (`id_component`) REFERENCES `grade_component` (`id_component`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `grade_component_examiner_ibfk_2` FOREIGN KEY (`id_examiner`) REFERENCES `lecturer_examiner` (`id_examiner`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `grade_component_supervisor`
--
ALTER TABLE `grade_component_supervisor`
  ADD CONSTRAINT `grade_component_supervisor_ibfk_1` FOREIGN KEY (`id_component`) REFERENCES `grade_component` (`id_component`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `grade_component_supervisor_ibfk_2` FOREIGN KEY (`id_supervisor`) REFERENCES `lecturer_supervisor` (`id_supervisor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lecturer_coordinator`
--
ALTER TABLE `lecturer_coordinator`
  ADD CONSTRAINT `lecturer_coordinator_ibfk_1` FOREIGN KEY (`nik`) REFERENCES `lecturer` (`nik`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lecturer_examiner`
--
ALTER TABLE `lecturer_examiner`
  ADD CONSTRAINT `lecturer_examiner_ibfk_1` FOREIGN KEY (`nik`) REFERENCES `lecturer` (`nik`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lecturer_supervisor`
--
ALTER TABLE `lecturer_supervisor`
  ADD CONSTRAINT `lecturer_supervisor_ibfk_1` FOREIGN KEY (`nik`) REFERENCES `lecturer` (`nik`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`npm`) REFERENCES `student` (`npm`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`id_coordinator`) REFERENCES `lecturer_coordinator` (`id_coordinator`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `schedule_examiner`
--
ALTER TABLE `schedule_examiner`
  ADD CONSTRAINT `schedule_examiner_ibfk_1` FOREIGN KEY (`id_schedule`) REFERENCES `schedule` (`id_schedule`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `schedule_examiner_ibfk_2` FOREIGN KEY (`id_examiner`) REFERENCES `lecturer_examiner` (`id_examiner`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`id_supervisor`) REFERENCES `lecturer_supervisor` (`id_supervisor`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
