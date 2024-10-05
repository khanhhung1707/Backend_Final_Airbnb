import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { upload } from '../config/upload.js';
import { createViTri, getAllViTri, getViTriById, getViTriWithPagination } from '../controllers/locationController.js';

const locationRouter = express.Router();

// Endpoint để lấy danh sách vị trí (Cần đăng nhập)
locationRouter.get('/vi-tri', isAuthenticated, getAllViTri);
// Endpoint để thêm vị trí mới (Chỉ admin mới được dùng)
locationRouter.post('/vi-tri', isAuthenticated, isAdmin, createViTri);
// Endpoint để phân trang và tìm kiếm vị trí (Cần đăng nhập)
locationRouter.get('/vi-tri/phan-trang-tim-kiem', isAuthenticated, getViTriWithPagination);
// Endpoint lấy danh sách vị trí theo id 
locationRouter.get('/vi-tri/:id', isAuthenticated, getViTriById);

export default locationRouter;