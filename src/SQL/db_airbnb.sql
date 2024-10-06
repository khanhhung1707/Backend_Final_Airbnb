/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `BinhLuan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_cong_viec` int DEFAULT NULL,
  `ma_nguoi_binh_luan` int DEFAULT NULL,
  `ngay_binh_luan` datetime DEFAULT NULL,
  `noi_dung` text,
  `sao_binh_luan` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_cong_viec` (`ma_cong_viec`),
  KEY `ma_nguoi_binh_luan` (`ma_nguoi_binh_luan`),
  CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`ma_cong_viec`) REFERENCES `Phong` (`id`),
  CONSTRAINT `BinhLuan_ibfk_2` FOREIGN KEY (`ma_nguoi_binh_luan`) REFERENCES `NguoiDung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DatPhong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_phong` int DEFAULT NULL,
  `ngay_den` datetime DEFAULT NULL,
  `ngay_di` datetime DEFAULT NULL,
  `so_luong_khach` int DEFAULT NULL,
  `ma_nguoi_dat` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_phong` (`ma_phong`),
  KEY `ma_nguoi_dat` (`ma_nguoi_dat`),
  CONSTRAINT `DatPhong_ibfk_1` FOREIGN KEY (`ma_phong`) REFERENCES `Phong` (`id`),
  CONSTRAINT `DatPhong_ibfk_2` FOREIGN KEY (`ma_nguoi_dat`) REFERENCES `NguoiDung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `birth_day` varchar(20) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Phong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_phong` varchar(255) DEFAULT NULL,
  `khach` int DEFAULT NULL,
  `phong_ngu` int DEFAULT NULL,
  `giuong` int DEFAULT NULL,
  `phong_tam` int DEFAULT NULL,
  `mo_ta` text,
  `gia_tien` int DEFAULT NULL,
  `may_giat` tinyint(1) DEFAULT NULL,
  `ban_la` tinyint(1) DEFAULT NULL,
  `tivi` tinyint(1) DEFAULT NULL,
  `dieu_hoa` tinyint(1) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `bep` tinyint(1) DEFAULT NULL,
  `do_xe` tinyint(1) DEFAULT NULL,
  `ho_boi` tinyint(1) DEFAULT NULL,
  `ban_ui` tinyint(1) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `ma_vi_tri` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vi_tri` (`ma_vi_tri`),
  CONSTRAINT `fk_vi_tri` FOREIGN KEY (`ma_vi_tri`) REFERENCES `ViTri` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ViTri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_vi_tri` varchar(255) DEFAULT NULL,
  `tinh_thanh` varchar(255) DEFAULT NULL,
  `quoc_gia` int DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BinhLuan` (`id`, `ma_cong_viec`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(1, 1, 6, '2024-10-12 10:00:00', 'Phòng sạch sẽ, dịch vụ tốt', 5);
INSERT INTO `BinhLuan` (`id`, `ma_cong_viec`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(2, 2, 7, '2024-11-02 11:00:00', 'Phòng đẹp, vị trí thuận tiện', 4);
INSERT INTO `BinhLuan` (`id`, `ma_cong_viec`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(3, 3, 8, '2024-12-21 12:00:00', 'Phòng rộng rãi, giá hợp lý', 5);
INSERT INTO `BinhLuan` (`id`, `ma_cong_viec`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(4, 4, 9, '2024-10-19 09:00:00', 'Dịch vụ chưa tốt lắm', 3),
(5, 5, 10, '2024-11-11 08:00:00', 'Phòng quá đẹp, tôi sẽ quay lại', 5),
(6, 1, 6, '2024-10-13 14:00:00', 'Phòng nhỏ hơn so với hình', 3),
(7, 2, 7, '2024-11-03 15:00:00', 'Nhân viên thân thiện', 4),
(8, 3, 8, '2024-12-22 16:00:00', 'Không gian thoải mái', 4),
(9, 4, 9, '2024-10-20 17:00:00', 'Đồ ăn ngon', 5),
(10, 5, 10, '2024-11-12 18:00:00', 'View rất đẹp', 5),
(11, 1, 6, '2024-10-14 19:00:00', 'Phòng cần cải thiện', 2),
(12, 2, 7, '2024-11-04 20:00:00', 'Vị trí đẹp, tiện lợi', 4),
(13, 3, 8, '2024-12-23 21:00:00', 'Sẽ quay lại lần sau', 5),
(14, 4, 9, '2024-10-21 22:00:00', 'Dịch vụ tốt, giá phải chăng', 5),
(15, 5, 10, '2024-11-13 23:00:00', 'Chất lượng vượt mong đợi', 5),
(16, 1, 6, '2024-10-15 08:00:00', 'Nội thất hơi cũ', 3),
(17, 2, 7, '2024-11-05 09:00:00', 'Dịch vụ không tốt lắm', 2),
(18, 3, 8, '2024-12-24 10:00:00', 'Giá cả hợp lý', 4),
(19, 4, 9, '2024-10-22 11:00:00', 'Phòng hơi ồn', 3),
(20, 5, 10, '2024-11-14 12:00:00', 'Nhân viên chu đáo', 5);

INSERT INTO `DatPhong` (`id`, `ma_phong`, `ngay_den`, `ngay_di`, `so_luong_khach`, `ma_nguoi_dat`) VALUES
(1, 1, '2024-10-10 14:00:00', '2024-10-15 12:00:00', 2, 6);
INSERT INTO `DatPhong` (`id`, `ma_phong`, `ngay_den`, `ngay_di`, `so_luong_khach`, `ma_nguoi_dat`) VALUES
(2, 2, '2024-11-01 14:00:00', '2024-11-05 12:00:00', 1, 7);
INSERT INTO `DatPhong` (`id`, `ma_phong`, `ngay_den`, `ngay_di`, `so_luong_khach`, `ma_nguoi_dat`) VALUES
(3, 3, '2024-12-20 14:00:00', '2024-12-25 12:00:00', 4, 8);
INSERT INTO `DatPhong` (`id`, `ma_phong`, `ngay_den`, `ngay_di`, `so_luong_khach`, `ma_nguoi_dat`) VALUES
(4, 4, '2024-10-18 14:00:00', '2024-10-22 12:00:00', 3, 9),
(5, 5, '2024-11-10 14:00:00', '2024-11-15 12:00:00', 5, 10),
(6, 1, '2024-10-10 00:00:00', '2024-10-10 00:00:00', 4, 16);

INSERT INTO `NguoiDung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`) VALUES
(1, 'Nguyễn Văn A', 'admin1@gmail.com', 'password1', '0909123456', '1990-01-01', 'Nam', 'admin', 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg');
INSERT INTO `NguoiDung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`) VALUES
(2, 'Trần Thị B', 'admin2@gmail.com', 'password2', '0909123457', '1985-05-15', 'Nữ', 'admin', 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg');
INSERT INTO `NguoiDung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`) VALUES
(3, 'Lê Quốc C', 'admin3@gmail.com', 'password3', '0909123458', '1988-03-30', 'Nam', 'admin', 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg');
INSERT INTO `NguoiDung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`) VALUES
(4, 'Phạm Văn D', 'admin4@gmail.com', 'password4', '0909123459', '1992-07-22', 'Nam', 'admin', 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg'),
(5, 'Đỗ Thị E', 'admin5@gmail.com', 'password5', '0909123460', '1987-09-10', 'Nữ', 'admin', 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg'),
(6, 'Nguyễn Văn F', 'user1@gmail.com', 'password6', '0909123461', '1991-02-02', 'Nam', 'user', 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg'),
(7, 'Trần Thị G', 'user2@gmail.com', 'password7', '0909123462', '1989-04-04', 'Nữ', 'user', 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg'),
(8, 'Lê Quốc H', 'user3@gmail.com', 'password8', '0909123463', '1990-06-06', 'Nam', 'user', 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg'),
(9, 'Phạm Văn I', 'user4@gmail.com', 'password9', '0909123464', '1993-08-08', 'Nam', 'user', 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg'),
(10, 'Đỗ Thị J', 'user5@gmail.com', 'password10', '0909123465', '1992-10-10', 'Nữ', 'user', 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg'),
(11, 'Nguyễn Văn K', 'user6@gmail.com', 'password11', '0909123466', '1990-12-12', 'Nam', 'user', 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg'),
(12, 'Trần Thị L', 'user7@gmail.com', 'password12', '0909123467', '1994-02-14', 'Nữ', 'user', 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg'),
(13, 'Lê Quốc M', 'user8@gmail.com', 'password13', '0909123468', '1991-04-18', 'Nam', 'user', 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg'),
(14, 'Phạm Văn N', 'user9@gmail.com', 'password14', '0909123469', '1989-06-20', 'Nam', 'user', 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg'),
(15, 'Đỗ Thị 0', 'user10@gmail.com', 'password15', '0909123470', '1995-08-24', 'Nữ', 'user', 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg'),
(16, 'Nguyễn Văn A', 'nguyenvana@example.com', '$2b$10$LpoIp0UyzuzUPYf6fiu6q.yfcYuWtXAIiz5hq00N4FhszA6g974YO', '0123456789', '1990-01-01', 'Nam', 'user', '1728133974086_1331188.png'),
(17, 'admin test', 'admintest@gmail.com', '$2b$10$9rkKnbiueGQFxuzmrX0J/.2oSYxxrAvNQD0NRf0fVdEbIGNBcjFgq', '0123456789', '1990-01-01', 'Nam', 'admin', 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg'),
(19, 'admin test 2', 'admintest2@gmail.com', '$2b$10$CV5hMH0MdBu4p5YVhFrYpOH4ZpkvqFCj0JvsYJzEHTP22hrh5ysda', '0123456789', '1990-01-01', 'Nam', 'admin', 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg');

INSERT INTO `Phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`) VALUES
(1, 'Phòng Deluxe', 2, 1, 1, 1, 'Phòng Deluxe với nhiều tiện nghi', 1500000, 1, 1, 1, 1, 1, 0, 1, 0, 0, 'link_hinh_anh.jpg', 1);
INSERT INTO `Phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`) VALUES
(2, 'Phòng Standard', 2, 1, 1, 1, 'Phòng tiêu chuẩn dành cho 2 người', 1000000, 1, 1, 1, 1, 1, 1, 0, 0, 1, 'standard.jpg', 1);
INSERT INTO `Phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`) VALUES
(3, 'Phòng Suite', 6, 3, 3, 2, 'Phòng Suite cao cấp với nhiều tiện nghi', 2500000, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'suite.jpg', 2);
INSERT INTO `Phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`) VALUES
(4, 'Phòng Family', 5, 2, 3, 2, 'Phòng gia đình rộng rãi', 2000000, 1, 1, 1, 1, 1, 1, 0, 1, 1, 'family.jpg', 3),
(5, 'Phòng VIP', 2, 1, 1, 1, 'Phòng VIP sang trọng', 3000000, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'vip.jpg', 4),
(6, 'Phòng King', 4, 2, 2, 1, 'Phòng dành cho gia đình', 1800000, 1, 1, 1, 1, 1, 1, 0, 0, 1, 'king.jpg', 5),
(7, 'Phòng Queen', 3, 1, 2, 1, 'Phòng với ban công hướng biển', 1700000, 1, 1, 1, 1, 1, 1, 0, 1, 1, 'queen.jpg', 6),
(8, 'Phòng Studio', 2, 1, 1, 1, 'Phòng studio hiện đại', 1200000, 1, 1, 1, 1, 1, 1, 0, 0, 1, 'studio.jpg', 7),
(9, 'Phòng Classic', 2, 1, 1, 1, 'Phòng cổ điển với nội thất gỗ', 1100000, 1, 1, 1, 1, 1, 1, 0, 1, 1, 'classic.jpg', 8),
(10, 'Phòng Elegant', 4, 2, 2, 1, 'Phòng với phong cách thanh lịch', 1600000, 1, 1, 1, 1, 1, 1, 0, 1, 1, '1728156457320_1331188.png', 9);

INSERT INTO `ViTri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(1, 'Hà Nội', 'Hà Nội', 1, 'hanoi.jpg');
INSERT INTO `ViTri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(2, 'Hồ Chí Minh', 'Hồ Chí Minh', 1, 'hochiminh.jpg');
INSERT INTO `ViTri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(3, 'Đà Nẵng', 'Đà Nẵng', 1, 'danang.jpg');
INSERT INTO `ViTri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(4, 'Hội An', 'Quảng Nam', 1, 'hoian.jpg'),
(5, 'Nha Trang', 'Khánh Hòa', 1, 'nhatrang.jpg'),
(6, 'Vũng Tàu', 'Bà Rịa-Vũng Tàu', 1, 'vungtau.jpg'),
(7, 'Phú Quốc', 'Kiên Giang', 1, 'phuquoc.jpg'),
(8, 'Sa Pa', 'Lào Cai', 1, 'sapa.jpg'),
(9, 'Huế', 'Thừa Thiên Huế', 1, 'hue.jpg'),
(10, 'Cần Thơ', 'Cần Thơ', 1, '1728166980695_1331188.png');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;