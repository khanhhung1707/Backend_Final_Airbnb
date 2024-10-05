import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { upload } from '../config/upload.js';
import { createViTri, deleteViTri, getAllViTri, getViTriById, getViTriWithPagination, updateViTri, uploadViTriImage } from '../controllers/locationController.js';

const locationRouter = express.Router();

// Endpoint để lấy danh sách vị trí (Cần đăng nhập)
locationRouter.get('/vi-tri', isAuthenticated, getAllViTri);
// Endpoint để thêm vị trí mới (Chỉ admin mới được dùng)
locationRouter.post('/vi-tri', isAuthenticated, isAdmin, createViTri);
// Endpoint để phân trang và tìm kiếm vị trí (Cần đăng nhập)
locationRouter.get('/vi-tri/phan-trang-tim-kiem', isAuthenticated, getViTriWithPagination);
// Endpoint lấy danh sách vị trí theo id 
locationRouter.get('/vi-tri/:id', isAuthenticated, getViTriById);
// Endpoint để chỉnh sửa vị trí (Chỉ admin mới được dùng)
locationRouter.put('/vi-tri/:id', isAuthenticated, isAdmin, updateViTri);
// Endpoint để xóa vị trí (Chỉ admin mới được dùng)
locationRouter.delete('/vi-tri/:id', isAuthenticated, isAdmin, deleteViTri);
// Endpoint để upload hình ảnh cho vị trí (Chỉ admin mới được dùng)
locationRouter.post('/vi-tri/upload-hinh-vitri', isAuthenticated, isAdmin, upload.single('hinhAnh'), uploadViTriImage);

export default locationRouter;