import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { createRoom, deleteRoom, getAllRooms, getPhongById, getPhongByViTri, getPhongPhanTrangTimKiem, updateRoom, uploadRoomImage } from '../controllers/roomController.js';
import { upload } from '../config/upload.js';

const roomRouter = express.Router();

// Endpoint để lấy danh sách phòng thuê (Cần đăng nhập)
roomRouter.get('/phong-thue', isAuthenticated, getAllRooms);
// Endpoint tạo phòng (Chỉ admin mới được dùng)
roomRouter.post('/phong-thue', isAuthenticated, isAdmin, createRoom);
// Endpoint để lấy phòng theo vị trí (Cần đăng nhập)
roomRouter.get('/phong-thue/lay-phong-theo-vi-tri', isAuthenticated, getPhongByViTri);
// Endpoint phân trang và tìm kiếm phòng (Cần đăng nhập)
roomRouter.get('/phong-thue/phan-trang-tim-kiem', isAuthenticated, getPhongPhanTrangTimKiem);
// Endpoint để lấy phòng theo ID (Cần đăng nhập)
roomRouter.get('/phong-thue/:id', isAuthenticated, getPhongById);
// Endpoint cập nhật thông tin phòng (Cần đăng nhập)
roomRouter.put('/phong-thue/:id', isAuthenticated, updateRoom);
// Endpoint xóa phòng theo ID (Cần đăng nhập)
roomRouter.delete('/phong-thue/:id', isAuthenticated, deleteRoom);
// Endpoint tải lên hình ảnh phòng (Chỉ admin mới được dùng)
roomRouter.post('/phong-thue/upload-hinh-phong', isAuthenticated, isAdmin, upload.single('image'), uploadRoomImage);

export default roomRouter;