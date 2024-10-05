import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';

const model = initModels(sequelize);

export const getComments = async (req, res) => {
    try {
        const comments = await model.BinhLuan.findAll({
            include: [
                {
                    model: model.NguoiDung,
                    as: 'ma_nguoi_binh_luan_NguoiDung',
                    attributes: ['name', 'email']  
                }
            ]
        });

        return responseData(comments, "Lấy bình luận thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi lấy bình luận", 500, res);
    }
};

export const postComment = async (req, res) => {
    const { maPhong, noiDung, saoBinhLuan } = req.body;
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!req.user || !req.user.id) {
        return responseData("", "Người dùng chưa đăng nhập", 401, res);
    }

    const maNguoiBinhLuan = req.user.id;  
    const ngayBinhLuan = new Date(); 

    try {
        // Tạo bình luận mới
        const newComment = await model.BinhLuan.create({
            ma_cong_viec: maPhong,         
            ma_nguoi_binh_luan: maNguoiBinhLuan,  
            ngay_binh_luan: ngayBinhLuan,  
            noi_dung: noiDung,             
            sao_binh_luan: saoBinhLuan     
        });

        return responseData(newComment, "Đăng bình luận thành công", 201, res);
    } catch (error) {
        return responseData("", "Lỗi khi đăng bình luận", 500, res);
    }
};

export const updateComment = async (req, res) => {
    const commentId = req.params.id; 
    const { noiDung, saoBinhLuan } = req.body; 

    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!req.user || !req.user.id) {
        return responseData("", "Người dùng chưa đăng nhập", 401, res);
    }

    try {
        // Tìm bình luận theo ID
        const comment = await model.BinhLuan.findByPk(commentId);

        // Kiểm tra xem bình luận có tồn tại hay không
        if (!comment) {
            return responseData("", "Bình luận không tồn tại", 404, res);
        }

        // Kiểm tra xem người dùng có quyền chỉnh sửa bình luận này không
        if (comment.ma_nguoi_binh_luan !== req.user.id) {
            return responseData("", "Bạn không có quyền chỉnh sửa bình luận này", 403, res);
        }

        // Cập nhật bình luận
        comment.noi_dung = noiDung || comment.noi_dung; // Chỉ cập nhật nếu có giá trị mới
        comment.sao_binh_luan = saoBinhLuan || comment.sao_binh_luan;

        await comment.save(); // Lưu lại thay đổi

        return responseData(comment, "Chỉnh sửa bình luận thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi chỉnh sửa bình luận", 500, res);
    }
};
export const deleteComment = async (req, res) => {
    const commentId = req.params.id; // Lấy ID bình luận từ URL

    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!req.user || !req.user.id) {
        return responseData("", "Người dùng chưa đăng nhập", 401, res);
    }

    try {
        // Tìm bình luận theo ID
        const comment = await model.BinhLuan.findByPk(commentId);

        // Kiểm tra xem bình luận có tồn tại hay không
        if (!comment) {
            return responseData("", "Bình luận không tồn tại", 404, res);
        }

        // Kiểm tra xem người dùng có quyền xóa bình luận này không
        if (comment.ma_nguoi_binh_luan !== req.user.id) {
            return responseData("", "Bạn không có quyền xóa bình luận này", 403, res);
        }

        // Xóa bình luận
        await comment.destroy(); // Xóa bình luận

        return responseData("", "Xóa bình luận thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi xóa bình luận", 500, res);
    }
};

export const getCommentsByRoom = async (req, res) => {
    const maPhong = req.params.maPhong; // Lấy MaPhong từ URL

    try {
        // Lấy danh sách bình luận theo ma_cong_viec
        const comments = await model.BinhLuan.findAll({
            where: {
                ma_cong_viec: maPhong
            },
            include: [{
                model: model.NguoiDung, // Bao gồm thông tin người bình luận
                as: 'ma_nguoi_binh_luan_NguoiDung', // Sử dụng alias đã định nghĩa
                attributes: ['id', 'email'], // Chọn các trường cần thiết
            }],
            order: [['ngay_binh_luan', 'DESC']] // Sắp xếp theo ngày bình luận mới nhất
        });

        // Kiểm tra nếu không có bình luận nào
        if (comments.length === 0) {
            return responseData([], "Không có bình luận nào cho phòng này", 404, res);
        }

        return responseData(comments, "Lấy bình luận thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi lấy bình luận", 500, res);
    }
};


