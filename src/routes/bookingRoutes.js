import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { deleteBooking, getAllBookings, getBookingById, getBookingsByUser, placeBooking, updateBooking } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

// Endpoint lấy bình luận (cần đăng nhập)
bookingRouter.get('/dat-phong',isAuthenticated, isAdmin, getAllBookings);
// Endpoint POST để đặt phòng
bookingRouter.post('/dat-phong', isAuthenticated, placeBooking);
// Endpoint GET để lấy thông tin đặt phòng theo ID (chỉ cho admin)
bookingRouter.get('/dat-phong/:id', isAuthenticated, isAdmin, getBookingById);
// Endpoint PUT để chỉnh sửa thông tin đặt phòng
bookingRouter.put('/dat-phong/:id', isAuthenticated, updateBooking);
// Endpoint DELETE để xóa đặt phòng
bookingRouter.delete('/dat-phong/:id', isAuthenticated, deleteBooking);
// Endpoint GET để lấy danh sách đặt phòng theo người dùng
bookingRouter.get('/dat-phong/lay-theo-nguoi-dung/:ma_nguoi_dat', isAuthenticated, getBookingsByUser);

export default bookingRouter;