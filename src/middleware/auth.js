import { responseData } from '../config/response.js';
import { verifyToken } from '../config/jwt.js';

// Middleware kiểm tra xem người dùng có phải admin không
export const isAdmin = (req, res, next) => {

  if (!req.user) {
    return responseData("", "Không tìm thấy thông tin người dùng", 403, res);
  }

  if (!req.user.role) {
    return responseData("", "Không tìm thấy quyền truy cập của người dùng", 403, res);
  }

  const { role } = req.user;

  if (role !== 'admin') {
    return responseData("", "Bạn không có quyền truy cập", 403, res);
  }

  next();  // Nếu role là admin, tiếp tục thực hiện request
};

// Middleware kiểm tra người dùng đã đăng nhập
export const isAuthenticated = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return responseData("", "Chưa đăng nhập", 401, res);
  }

  try {
    const decoded = verifyToken(token);  

    //  kiểm tra dữ liệu bên trong token
    if (!decoded || !decoded.data || !decoded.data.role) {
      return responseData("", "Token không hợp lệ", 401, res);
    }

    req.user = decoded.data;

    next();
  } catch (error) {
    return responseData("", "Token không hợp lệ", 401, res);
  }
};
