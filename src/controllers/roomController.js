import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';
import { Op } from 'sequelize';

const model = initModels(sequelize);

// API để lấy danh sách phòng thuê (Cần đăng nhập)
export const getAllRooms = async (req, res) => {
    try {
      const allRooms = await model.Phong.findAll(); // Lấy tất cả phòng từ model Phong
      return responseData(allRooms, "Lấy danh sách phòng thuê thành công", 200, res);
    } catch (error) {
      return responseData("", "Lỗi khi lấy danh sách phòng thuê", 500, res);
    }
  };

 // API post phòng thuê (only admin)
 export const createRoom = async (req, res) => {
    const {
      tenPhong,
      khach,
      phongNgu,
      giuong,
      phongTam,
      moTa,
      giaTien,
      mayGiat,
      banLa,
      tivi,
      dieuHoa,
      wifi,
      bep,
      doXe,
      hoBoi,
      banUi,
      maViTri,
      hinhAnh,
    } = req.body;
  
    try {
      // Tạo một phòng mới
      const newRoom = await model.Phong.create({
        ten_phong: tenPhong,
        khach,
        phong_ngu: phongNgu,
        giuong,
        phong_tam: phongTam,
        mo_ta: moTa,
        gia_tien: giaTien,
        may_giat: mayGiat,
        ban_la: banLa,
        tivi,
        dieu_hoa: dieuHoa,
        wifi,
        bep,
        do_xe: doXe,
        ho_boi: hoBoi,
        ban_ui: banUi,
        hinh_anh: hinhAnh,
      });
  
      return res.status(201).json({
        message: "Tạo phòng thành công",
        room: newRoom,
      });
    } catch (error) {
      return res.status(500).json({ message: "Lỗi khi tạo phòng" });
    }
  };

  // API Lấy phòng theo mã vị trí
export const getPhongByViTri = async (req, res) => {
    const ma_vi_tri = req.query.ma_vi_tri; // Lấy mã vị trí từ query string

    // Kiểm tra thông tin hợp lệ
    if (!ma_vi_tri) {
        return responseData("", "Mã vị trí không hợp lệ", 400, res);
    }

    try {
        // Tìm tất cả phòng theo ma_vi_tri
        const phongList = await model.Phong.findAll({
            where: { ma_vi_tri: ma_vi_tri },
            include: [
                {
                    model: model.ViTri,
                    as: 'ma_vi_tri_ViTri', 
                },
            ],
        });

        if (phongList.length === 0) {
            return responseData("", "Không tìm thấy phòng cho vị trí này", 404, res);
        }

        return responseData(phongList, "Lấy danh sách phòng thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi lấy danh sách phòng", 500, res);
    }
};
// API lấy lấy phòng phân trang tìm kiếm
export const getPhongPhanTrangTimKiem = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const search = req.query.search || ""; 

    try {
        // Tính toán offset
        const offset = (page - 1) * limit;

        // Tìm kiếm phòng
        const { count, rows } = await model.Phong.findAndCountAll({
            where: {
                ten_phong: {
                    [Op.like]: `%${search}%` // Tìm kiếm theo tên phòng
                }
            },
            limit: limit,
            offset: offset,
            include: [
                {
                    model: model.ViTri,
                    as: 'ma_vi_tri_ViTri',
                },
            ],
        });

        // Kiểm tra nếu không tìm thấy phòng
        if (rows.length === 0) {
            return responseData([], "Không tìm thấy phòng", 404, res);
        }

        // Trả về kết quả
        return responseData({
            total: count, // Tổng số phòng
            totalPages: Math.ceil(count / limit), // Tổng số trang
            currentPage: page, // Trang hiện tại
            rooms: rows // Danh sách phòng
        }, "Lấy danh sách phòng thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi lấy danh sách phòng", 500, res);
    }
};
// API để lấy chi tiết phòng theo ID (Cần đăng nhập)
export const getPhongById = async (req, res) => {
    const { id } = req.params; 

    try {
        // Tìm phòng theo ID
        const phong = await model.Phong.findOne({
            where: { id },
            include: [
                {
                    model: model.ViTri,
                    as: 'ma_vi_tri_ViTri', 
                },
            ],
        });

        if (!phong) {
            return responseData("", "Không tìm thấy phòng", 404, res);
        }

        return responseData(phong, "Lấy thông tin phòng thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi lấy thông tin phòng", 500, res);
    }
};

// API để cập nhật thông tin phòng theo ID (Cần đăng nhập)
export const updateRoom = async (req, res) => {
    const { id } = req.params; 
    const {
        tenPhong,
        khach,
        phongNgu,
        giuong,
        phongTam,
        moTa,
        giaTien,
        mayGiat,
        banLa,
        tivi,
        dieuHoa,
        wifi,
        bep,
        doXe,
        hoBoi,
        banUi,
        maViTri,
        hinhAnh,
    } = req.body;

    try {
        // Tìm phòng theo ID
        const room = await model.Phong.findOne({ where: { id } });

        if (!room) {
            return responseData("", "Không tìm thấy phòng", 404, res);
        }

        // Cập nhật thông tin phòng
        await room.update({
            ten_phong: tenPhong,
            khach,
            phong_ngu: phongNgu,
            giuong,
            phong_tam: phongTam,
            mo_ta: moTa,
            gia_tien: giaTien,
            may_giat: mayGiat,
            ban_la: banLa,
            tivi,
            dieu_hoa: dieuHoa,
            wifi,
            bep,
            do_xe: doXe,
            ho_boi: hoBoi,
            ban_ui: banUi,
            ma_vi_tri: maViTri,
            hinh_anh: hinhAnh,
        });

        return responseData(room, "Cập nhật phòng thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi cập nhật phòng", 500, res);
    }
};
// API xóa phòng theo ID (Cần đăng nhập)
export const deleteRoom = async (req, res) => {
    const roomId = req.params.id; // Lấy ID từ params

    try {
        const room = await model.Phong.findByPk(roomId); 

        // Kiểm tra xem phòng có tồn tại không
        if (!room) {
            return responseData("", "Không tìm thấy phòng", 404, res);
        }

        await room.destroy();

        return responseData("", "Xóa phòng thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi xóa phòng", 500, res);
    }
};

// API tải lên hình ảnh phòng (Chỉ admin mới được dùng)
export const uploadRoomImage = async (req, res) => {
    try {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!req.user) {
            return res.status(401).json({ message: 'Bạn cần phải đăng nhập để thực hiện hành động này.' });
        }

        // Lấy ID phòng từ req.body
        const roomId = req.body.id; 
        
        // Kiểm tra xem có file hình ảnh không
        if (!req.file) {
            return res.status(400).json({ message: 'Không có file hình ảnh được gửi.' });
        }

        // Cập nhật đường dẫn của hình ảnh trong cơ sở dữ liệu
        const imagePath = req.file.filename; // Đường dẫn file đã lưu

        // Tìm phòng theo ID
        const room = await model.Phong.findByPk(roomId); 

        // Kiểm tra xem phòng có tồn tại không
        if (!room) {
            return res.status(404).json({ message: 'Không tìm thấy phòng.' });
        }

        // Cập nhật đường dẫn hình ảnh vào phòng
        room.hinh_anh = imagePath; 
        await room.save(); 

        return res.status(200).json({ message: 'Tải lên hình ảnh thành công!', imagePath });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi khi tải lên hình ảnh', error });
    }
};