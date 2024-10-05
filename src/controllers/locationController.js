import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';
import { Op } from 'sequelize';

const model = initModels(sequelize);

// lấy danh sách các vị trí
export const getAllViTri = async (req, res) => {
    try {
        // Lấy danh sách các vị trí từ cơ sở dữ liệu
        const viTriList = await model.ViTri.findAll();

        return res.status(200).json({
            message: 'Lấy danh sách vị trí thành công!',
            data: viTriList,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách vị trí', error });
    }
};

// tạo vị trí
export const createViTri = async (req, res) => {
    const { tenViTri, tinhThanh, quocGia, hinhAnh } = req.body;

    try {
        // Tạo mới một vị trí
        const newViTri = await model.ViTri.create({
            ten_vi_tri: tenViTri,
            tinh_thanh: tinhThanh,
            quoc_gia: quocGia,
            hinh_anh: hinhAnh,
        });

        return res.status(201).json({
            message: 'Thêm vị trí thành công!',
            data: newViTri,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi thêm vị trí', error });
    }
};

// API phân trang tìm kiếm vị trí
export const getViTriWithPagination = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;

    try {
        const options = {
            where: {
                ten_vi_tri: {
                    [Op.like]: `%${search}%`, // Tìm kiếm theo tên vị trí
                },
            },
            offset: (page - 1) * limit,
            limit: parseInt(limit),
        };

        const { count, rows } = await model.ViTri.findAndCountAll(options);

        const totalPages = Math.ceil(count / limit);

        return res.status(200).json({
            totalItems: count,
            totalPages,
            currentPage: page,
            items: rows,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách vị trí' });
    }
};

// Lấy phòng theo id 
export const getViTriById = async (req, res) => {
    const { id } = req.params; 

    try {
        // Tìm vị trí theo ID và kèm theo danh sách phòng liên quan
        const viTri = await model.ViTri.findOne({
            where: { id },
            include: [
                {
                    model: model.Phong,
                    as: 'Phongs', 
                },
            ],
        });

        if (!viTri) {
            return responseData("", "Không tìm thấy vị trí", 404, res);
        }

        return responseData(viTri, "Lấy thông tin vị trí và danh sách phòng thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi lấy thông tin vị trí", 500, res);
    }
};

// API chỉnh sửa vị trí theo id
export const updateViTri = async (req, res) => {
    const { id } = req.params; // Lấy id từ URL params
    const { ten_vi_tri, tinh_thanh, quoc_gia, hinh_anh } = req.body; 

    try {
        // Kiểm tra xem vị trí có tồn tại hay không
        const viTri = await model.ViTri.findOne({ where: { id } });
        if (!viTri) {
            return responseData("", "Không tìm thấy vị trí", 404, res);
        }

        // Xác thực dữ liệu đầu vào
        if (!ten_vi_tri || !tinh_thanh || !quoc_gia || !hinh_anh) {
            return responseData("", "Vui lòng điền đầy đủ thông tin", 400, res);
        }
        if (isNaN(quoc_gia)) {
            return responseData("", "quoc_gia phải là một số hợp lệ", 400, res);
        }

        viTri.ten_vi_tri = ten_vi_tri;
        viTri.tinh_thanh = tinh_thanh;
        viTri.quoc_gia = quoc_gia;
        viTri.hinh_anh = hinh_anh;

        // Lưu lại các thay đổi
        await viTri.save();

        // Kiểm tra xem việc lưu có thành công hay không
        const updatedViTri = await model.ViTri.findOne({ where: { id } });
        if (updatedViTri) {
            return responseData(updatedViTri, "Cập nhật vị trí thành công", 200, res);
        } else {
            return responseData("", "Không thể cập nhật vị trí", 500, res);
        }
    } catch (error) {
        return responseData("", "Lỗi khi cập nhật vị trí", 500, res);
    }
};

// xóa vị trí (admin)
export const deleteViTri = async (req, res) => {
    const { id } = req.params; 

    try {
        // Tìm vị trí theo ID
        const viTri = await model.ViTri.findOne({ where: { id } });

        if (!viTri) {
            return responseData("", "Không tìm thấy vị trí", 404, res);
        }

        await viTri.destroy();

        return responseData("", "Xóa vị trí thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi xóa vị trí", 500, res);
    }
};

// API upload hình vị trí
export const uploadViTriImage = async (req, res) => {
    try {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (!req.user) {
            return res.status(401).json({ message: 'Bạn cần phải đăng nhập để thực hiện hành động này.' });
        }

        const viTriId = req.body.id;

        // Kiểm tra xem có file hình ảnh được gửi không
        if (!req.file) {
            return res.status(400).json({ message: 'Không có file hình ảnh được gửi.' });
        }

        // Đường dẫn file đã lưu 
        const imagePath = req.file.filename;

        // Tìm vị trí theo ID
        const viTri = await model.ViTri.findByPk(viTriId);

        // Kiểm tra xem vị trí có tồn tại không
        if (!viTri) {
            return res.status(404).json({ message: 'Không tìm thấy vị trí.' });
        }

        // Cập nhật đường dẫn hình ảnh vào vị trí
        viTri.hinh_anh = imagePath; 
        await viTri.save();

        return res.status(200).json({ message: 'Tải lên hình ảnh thành công!', imagePath });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi tải lên hình ảnh', error });
    }
};
