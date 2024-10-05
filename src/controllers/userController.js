import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { upload } from '../config/upload.js';


const model = initModels(sequelize);

// API lấy danh sách người dùng (chỉ dành cho admin)
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await model.NguoiDung.findAll();

        return responseData(allUsers, "Lấy danh sách người dùng thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi lấy danh sách người dùng", 500, res);
    }
};

// post user 
export const createUser = async (req, res) => {
    try {
        const { id, name, email, password, phone, birthday, gender, role, avatar } = req.body;

        // Kiểm tra quyền Admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Bạn không có quyền thêm người dùng.' });
        }

        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await model.NguoiDung.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email này đã tồn tại.' });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = await model.NguoiDung.create({
            id,
            name,
            email,
            pass_word: hashedPassword, 
            phone,
            birth_day: birthday,
            gender: gender ? 'Male' : 'Female', 
            role,
            avatar
        });

        return responseData(newUser, "Tạo người dùng thành công", 201, res);
    } catch (error) {
        return responseData("", "Lỗi khi tạo người dùng", 500, res);
    }
};

//delete user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra quyền Admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Bạn không có quyền xóa người dùng.' });
        }

        // Kiểm tra xem người dùng có tồn tại không
        const userToDelete = await model.NguoiDung.findByPk(id);
        if (!userToDelete) {
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }

        // Xóa người dùng
        await userToDelete.destroy();

        return responseData("", "Xóa người dùng thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi xóa người dùng", 500, res);
    }
};

//get user phân trang
export const getUsersWithPaginationAndSearch = async (req, res) => {
    try {
        // Kiểm tra quyền Admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập vào dữ liệu này.' });
        }

        // Lấy trang và số lượng người dùng trên mỗi trang 
        const page = parseInt(req.query.page) || 1; // Trang mặc định là 1
        const limit = parseInt(req.query.limit) || 10; // Số lượng mặc định là 10

        // Lấy từ khóa tìm kiếm 
        const search = req.query.search || '';

        // Tính toán offset
        const offset = (page - 1) * limit;

        // Tìm kiếm người dùng với phân trang
        const users = await model.NguoiDung.findAndCountAll({
            where: {
                name: {
                    [Op.like]: `%${search}%`, 
                },
            },
            limit,
            offset,
        });

        // Tính tổng số trang
        const totalPages = Math.ceil(users.count / limit);

        return responseData(users.rows, "Lấy người dùng thành công", 200, res, {
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        return responseData("", "Lỗi khi lấy người dùng", 500, res);
    }
};

// API lấy thông tin người dùng theo id (cần đăng nhập)
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        // Tìm người dùng theo ID
        const user = await model.NguoiDung.findByPk(id);
        
        // Kiểm tra xem người dùng có tồn tại không
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }

        // Trả về thông tin người dùng (có thể loại bỏ mật khẩu hoặc thông tin nhạy cảm khác nếu cần)
        const { pass_word, ...userData } = user.dataValues;

        return responseData(userData, "Lấy thông tin người dùng thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi lấy thông tin người dùng", 500, res);
    }
};

// API chỉnh sửa thông tin người dùng (admin sử dụng được và người dùng có thể chỉnh thông tin của chính họ)
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra nếu người dùng là admin
        const isAdmin = req.user.role === 'admin';

        // Nếu không phải admin, chỉ cho phép họ sửa thông tin của chính mình
        if (!isAdmin && req.user.id !== parseInt(id)) {
            return res.status(403).json({ message: 'Bạn không có quyền cập nhật thông tin người dùng khác.' });
        }

        // Kiểm tra người dùng có tồn tại không
        const userToUpdate = await model.NguoiDung.findByPk(id);
        if (!userToUpdate) {
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }

        // Cập nhật thông tin người dùng
        const { name, email, phone, birth_day, gender, avatar } = req.body;
        await userToUpdate.update({
            name,
            email,
            phone,
            birth_day,
            gender,
            avatar
        });

        return responseData(userToUpdate, "Cập nhật thông tin người dùng thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi cập nhật thông tin người dùng", 500, res);
    }
};

// API tìm kiếm người dùng theo tên
export const searchUsersByName = async (req, res) => {
    try {
        const { TenNguoiDung } = req.params;

        // Kiểm tra quyền Admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập vào dữ liệu này.' });
        }

        // Tìm kiếm người dùng theo tên
        const users = await model.NguoiDung.findAll({
            where: {
                name: {
                    [Op.like]: `%${TenNguoiDung}%`, // Tìm kiếm tương đối
                },
            },
        });

        if (users.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng nào.' });
        }

        return responseData(users, "Tìm kiếm người dùng thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi tìm kiếm người dùng", 500, res);
    }
};

// API upload avatar
export const uploadAvatar = async (req, res) => {
    try {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!req.user) {
            return res.status(401).json({ message: 'Bạn cần phải đăng nhập để thực hiện hành động này.' });
        }

        // Kiểm tra xem có file avatar không
        if (!req.file) {
            return res.status(400).json({ message: 'Không có file avatar được gửi.' });
        }

        // Cập nhật đường dẫn của avatar trong cơ sở dữ liệu
        const userId = req.user.id; // Lấy ID người dùng từ token
        const avatarPath = req.file.filename; // Đường dẫn file đã lưu

        await model.NguoiDung.update({ avatar: avatarPath }, { where: { id: userId } });

        return res.status(200).json({ message: 'Cập nhật avatar thành công!', avatar: avatarPath });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật avatar', error });
    }
};

