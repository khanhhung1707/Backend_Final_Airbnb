import express from 'express';

import { isAuthenticated } from '../middleware/auth.js';  
import { deleteComment, getComments, getCommentsByRoom, postComment, updateComment } from '../controllers/commentController.js';

const CommentRouter = express.Router();

// Endpoint lấy bình luận (cần đăng nhập)
CommentRouter.get('/binh-luan', isAuthenticated, getComments);
// Endpoint gửi bình luận (cần đăng nhập)
CommentRouter.post('/binh-luan', isAuthenticated, postComment);
// Endpoint chỉnh sửa bình luận
CommentRouter.put('/binh-luan/:id', isAuthenticated, updateComment);
// Endpoint xóa bình luận
CommentRouter.delete('/binh-luan/:id', isAuthenticated, deleteComment);
// Endpoint lấy bình luận theo phòng
CommentRouter.get('/binh-luan/lay-binh-luan-theo-phong/:maPhong', getCommentsByRoom);

export default CommentRouter;
