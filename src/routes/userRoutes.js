import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { createUser, deleteUser, getAllUsers, getUserById, getUsersWithPaginationAndSearch, searchUsersByName, updateUser, uploadAvatar } from '../controllers/userController.js';
import { upload } from '../config/upload.js';
const userRouter = express.Router();

// Endpoint lấy danh sách người dùng (Chỉ admin mới được dùng)
userRouter.get('/users', isAuthenticated, isAdmin, getAllUsers);
// Endpoint post users (Chỉ admin mới đc dùng)
userRouter.post('/users', isAuthenticated, isAdmin, createUser);
// Endpoint delete users (only admin)
userRouter.delete('/users/:id', isAuthenticated, isAdmin, deleteUser);
// Endpoint phân trang và tìm kiếm người dùng (Chỉ admin mới được dùng)
userRouter.get('/users/phan-trang-tim-kiem', isAuthenticated, isAdmin, getUsersWithPaginationAndSearch);
// Endpoint lấy thông tin người dùng theo id (Cần đăng nhập)
userRouter.get('/users/:id', isAuthenticated, getUserById);
// Endpoint chỉnh sửa thoogn tin người dùng (người dùng có thể chỉnh sửa thông tin của họ và admin có thể chỉnh sửa hết)
userRouter.put('/users/:id', isAuthenticated, updateUser);
// Endpoint tìm kiếm dựa theo tên người dùng (Chỉ admin mới được dùng)
userRouter.get('/users/search/:TenNguoiDung', isAuthenticated, isAdmin, searchUsersByName);
// Endpoint tải lên ảnh đại diện
userRouter.post('/users/upload-avatar', isAuthenticated, upload.single('avatar'), uploadAvatar);
export default userRouter;