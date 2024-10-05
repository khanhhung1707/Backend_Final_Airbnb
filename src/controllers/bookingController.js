import { responseData } from '../config/response.js';
import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';

const model = initModels(sequelize);

//get dat-phong
export const getAllBookings = async (req, res) => {
    try {
        const allBookings = await model.DatPhong.findAll({
            include: [
                {
                    model: model.Phong,
                    as: 'ma_phong_Phong',
                },
                {
                    model: model.NguoiDung,
                    as: 'ma_nguoi_dat_NguoiDung',
                },
            ],
        });
        return responseData(allBookings, "Lấy danh sách phòng đặt thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi lấy danh sách phòng đặt", 500, res);
    }
};

// post dat-phong
export const placeBooking = async (req, res) => {
    const { ma_phong, ngay_den, ngay_di, so_luong_khach } = req.body;

    // Kiểm tra thông tin hợp lệ
    if (!ma_phong || !ngay_den || !ngay_di || !so_luong_khach) {
        return responseData("", "Thông tin không đầy đủ", 400, res);
    }

    try {
        const booking = await model.DatPhong.create({
            ma_phong,
            ngay_den,
            ngay_di,
            so_luong_khach,
            ma_nguoi_dat: req.user.id, 
        });

        return responseData(booking, "Đặt phòng thành công", 201, res);
    } catch (error) {
        return responseData("", "Lỗi khi đặt phòng", 500, res);
    }
};
// get dat-phong theo id dat-phong
export const getBookingById = async (req, res) => {
    const bookingId = req.params.id;

    try {
        const booking = await model.DatPhong.findOne({
            where: { id: bookingId },
            include: [
                {
                    model: model.Phong,
                    as: 'ma_phong_Phong',
                },
                {
                    model: model.NguoiDung,
                    as: 'ma_nguoi_dat_NguoiDung',
                },
            ],
        });

        if (!booking) {
            return responseData("", "Không tìm thấy thông tin đặt phòng", 404, res);
        }

        return responseData(booking, "Lấy thông tin đặt phòng thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi lấy thông tin đặt phòng", 500, res);
    }
};

//put dat-phong (người dùng chỉ có thể chỉnh sửa phòng đặt của họ)
export const updateBooking = async (req, res) => {
    const bookingId = req.params.id;
    const userId = req.user.id;  
    const updatedData = req.body;  

    try {
        // Tìm đặt phòng theo ID và kiểm tra xem người dùng có phải là người đặt hay không
        const booking = await model.DatPhong.findOne({ where: { id: bookingId } });

        if (!booking) {
            return responseData("", "Không tìm thấy thông tin đặt phòng", 404, res);
        }

        if (booking.ma_nguoi_dat !== userId) {
            return responseData("", "Bạn không có quyền chỉnh sửa đặt phòng này", 403, res);
        }

        // Cập nhật thông tin đặt phòng
        await model.DatPhong.update(updatedData, { where: { id: bookingId } });

        return responseData("", "Cập nhật thông tin đặt phòng thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi cập nhật thông tin đặt phòng", 500, res);
    }
};

//xóa đặt phòng
export const deleteBooking = async (req, res) => {
    const bookingId = req.params.id;
    const userId = req.user.id;  // Lấy ID người dùng từ token

    try {
        // Tìm đặt phòng theo ID và kiểm tra xem người dùng có phải là người đặt hay không
        const booking = await model.DatPhong.findOne({ where: { id: bookingId } });

        if (!booking) {
            return responseData("", "Không tìm thấy thông tin đặt phòng", 404, res);
        }

        if (booking.ma_nguoi_dat !== userId) {
            return responseData("", "Bạn không có quyền xóa đặt phòng này", 403, res);
        }

        // Xóa đặt phòng
        await model.DatPhong.destroy({ where: { id: bookingId } });

        return responseData("", "Xóa đặt phòng thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi xóa đặt phòng", 500, res);
    }
};

// lấy phòng theo mã người đặt
export const getBookingsByUser = async (req, res) => {
    const maNguoiDat = req.params.ma_nguoi_dat;  // Lấy mã người dùng từ tham số URL

    try {
        // Tìm tất cả đặt phòng theo ma_nguoi_dat
        const bookings = await model.DatPhong.findAll({
            where: { ma_nguoi_dat: maNguoiDat },
            include: [
                {
                    model: model.Phong,
                    as: 'ma_phong_Phong',
                },
                {
                    model: model.NguoiDung,
                    as: 'ma_nguoi_dat_NguoiDung',
                },
            ],
        });

        if (bookings.length === 0) {
            return responseData("", "Không tìm thấy đặt phòng nào cho người dùng này", 404, res);
        }

        return responseData(bookings, "Lấy danh sách đặt phòng thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi lấy danh sách đặt phòng", 500, res);
    }
};