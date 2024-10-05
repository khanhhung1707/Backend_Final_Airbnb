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
        console.error("Error fetching vi tri list:", error);
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
        console.error("Error creating vi tri:", error);
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
        console.error('Error fetching locations:', error);
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách vị trí' });
    }
};

// Lấy phòng theo id 
export const getViTriById = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params

    try {
        // Tìm vị trí theo ID và kèm theo danh sách phòng liên quan
        const viTri = await model.ViTri.findOne({
            where: { id },
            include: [
                {
                    model: model.Phong,
                    as: 'Phongs', // Phải khớp với alias định nghĩa trong initModels
                },
            ],
        });

        if (!viTri) {
            return responseData("", "Không tìm thấy vị trí", 404, res);
        }

        return responseData(viTri, "Lấy thông tin vị trí và danh sách phòng thành công", 200, res);
    } catch (error) {
        console.error("Error fetching location by ID:", error);
        return responseData("", "Lỗi khi lấy thông tin vị trí", 500, res);
    }
};