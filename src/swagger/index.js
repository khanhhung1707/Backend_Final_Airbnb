// AUTH
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     description: Đăng ký người dùng mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               pass_word:
 *                 type: string
 *               phone:
 *                 type: string
 *               birth_day:
 *                 type: string
 *               gender:
 *                 type: string
 *               role:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Đăng nhập người dùng
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               pass_word:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */

// USER
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Đảm bảo người dùng đã xác thực
 *     responses:
 *       200:
 *         description: Lấy danh sách người dùng thành công
 *       401:
 *         description: Không được phép
 *       500:
 *         description: Lỗi khi lấy danh sách người dùng
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Tạo người dùng mới
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Đảm bảo người dùng đã xác thực
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               pass_word:
 *                 type: string
 *               phone:
 *                 type: string
 *               birth_day:
 *                 type: string
 *               gender:
 *                 type: string
 *               role:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo người dùng thành công
 *       400:
 *         description: Email đã tồn tại hoặc dữ liệu không hợp lệ
 *       401:
 *         description: Không được phép
 *       500:
 *         description: Lỗi khi tạo người dùng
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Xóa người dùng theo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Đảm bảo người dùng đã xác thực
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng cần xóa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa người dùng thành công
 *       401:
 *         description: Không được phép
 *       404:
 *         description: Người dùng không tồn tại
 *       500:
 *         description: Lỗi khi xóa người dùng
 */

/**
 * @swagger
 * /users/phan-trang-tim-kiem:
 *   get:
 *     summary: Lấy người dùng với phân trang và tìm kiếm
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Đảm bảo người dùng đã xác thực
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy người dùng thành công
 *       401:
 *         description: Không được phép
 *       500:
 *         description: Lỗi khi lấy người dùng
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Lấy thông tin người dùng theo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Đảm bảo người dùng đã xác thực
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng cần lấy thông tin
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy thông tin người dùng thành công
 *       401:
 *         description: Không được phép
 *       404:
 *         description: Người dùng không tồn tại
 *       500:
 *         description: Lỗi khi lấy thông tin người dùng
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Đảm bảo người dùng đã xác thực
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng cần cập nhật
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               birth_day:
 *                 type: string
 *               gender:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thông tin người dùng thành công
 *       401:
 *         description: Không được phép
 *       404:
 *         description: Người dùng không tồn tại
 *       500:
 *         description: Lỗi khi cập nhật thông tin người dùng
 */

/**
 * @swagger
 * /users/search/{TenNguoiDung}:
 *   get:
 *     summary: Tìm kiếm người dùng theo tên
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Đảm bảo người dùng đã xác thực
 *     parameters:
 *       - in: path
 *         name: TenNguoiDung
 *         required: true
 *         description: Tên của người dùng cần tìm kiếm
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tìm kiếm người dùng thành công
 *       401:
 *         description: Không được phép
 *       404:
 *         description: Không tìm thấy người dùng nào
 *       500:
 *         description: Lỗi khi tìm kiếm người dùng
 */

/**
 * @swagger
 * /users/upload-avatar:
 *   post:
 *     summary: Tải lên ảnh đại diện cho người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Đảm bảo người dùng đã xác thực
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cập nhật avatar thành công
 *       401:
 *         description: Không được phép
 *       400:
 *         description: Không có file avatar được gửi
 *       500:
 *         description: Lỗi khi cập nhật avatar
 */

// Booking room
/**
 * @swagger
 * /dat-phong:
 *   get:
 *     summary: Lấy tất cả đặt phòng
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 *       403:
 *         description: Cấm
 */

/**
 * @swagger
 * /dat-phong:
 *   post:
 *     summary: Đặt phòng mới
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ma_phong:
 *                 type: integer
 *               ngay_den:
 *                 type: string
 *                 format: date
 *               ngay_di:
 *                 type: string
 *                 format: date
 *               so_luong_khach:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Đặt thành công
 *       400:
 *         description: Thông tin không đầy đủ
 *       403:
 *         description: Cấm
 */

/**
 * @swagger
 * /dat-phong/{id}:
 *   get:
 *     summary: Lấy thông tin đặt phòng theo ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của đặt phòng
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy thông tin đặt phòng
 *       403:
 *         description: Cấm
 */

/**
 * @swagger
 * /dat-phong/{id}:
 *   put:
 *     summary: Chỉnh sửa thông tin đặt phòng
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của đặt phòng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ma_phong:
 *                 type: integer
 *               ngay_den:
 *                 type: string
 *                 format: date
 *               ngay_di:
 *                 type: string
 *                 format: date
 *               so_luong_khach:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy thông tin đặt phòng
 *       403:
 *         description: Bạn không có quyền chỉnh sửa đặt phòng này
 */

/**
 * @swagger
 * /dat-phong/{id}:
 *   delete:
 *     summary: Xóa đặt phòng
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của đặt phòng
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy thông tin đặt phòng
 *       403:
 *         description: Bạn không có quyền xóa đặt phòng này
 */

/**
 * @swagger
 * /dat-phong/lay-theo-nguoi-dung/{ma_nguoi_dat}:
 *   get:
 *     summary: Lấy danh sách đặt phòng theo người dùng
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: ma_nguoi_dat
 *         in: path
 *         required: true
 *         description: Mã người dùng đặt phòng
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy đặt phòng nào cho người dùng này
 *       403:
 *         description: Cấm
 */

// COMMENT
/**
 * @swagger
 * /binh-luan:
 *   get:
 *     tags: [Comments]
 *     summary: Lấy danh sách bình luận
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy bình luận thành công
 *       500:
 *         description: Lỗi khi lấy bình luận
 */

/**
 * @swagger
 * /binh-luan:
 *   post:
 *     tags: [Comments]
 *     summary: Gửi bình luận
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maPhong:
 *                 type: integer
 *               noiDung:
 *                 type: string
 *               saoBinhLuan:
 *                 type: integer
 *                 description: Đánh giá từ 1 đến 5
 *     responses:
 *       201:
 *         description: Đăng bình luận thành công
 *       401:
 *         description: Người dùng chưa đăng nhập
 *       500:
 *         description: Lỗi khi đăng bình luận
 */

/**
 * @swagger
 * /binh-luan/{id}:
 *   put:
 *     tags: [Comments]
 *     summary: Chỉnh sửa bình luận
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của bình luận
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               noiDung:
 *                 type: string
 *               saoBinhLuan:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Chỉnh sửa bình luận thành công
 *       403:
 *         description: Bạn không có quyền chỉnh sửa bình luận này
 *       404:
 *         description: Bình luận không tồn tại
 *       500:
 *         description: Lỗi khi chỉnh sửa bình luận
 */

/**
 * @swagger
 * /binh-luan/{id}:
 *   delete:
 *     tags: [Comments]
 *     summary: Xóa bình luận
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của bình luận
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa bình luận thành công
 *       403:
 *         description: Bạn không có quyền xóa bình luận này
 *       404:
 *         description: Bình luận không tồn tại
 *       500:
 *         description: Lỗi khi xóa bình luận
 */

/**
 * @swagger
 * /binh-luan/lay-binh-luan-theo-phong/{maPhong}:
 *   get:
 *     tags: [Comments]
 *     summary: Lấy bình luận theo phòng
 *     parameters:
 *       - name: maPhong
 *         in: path
 *         required: true
 *         description: Mã phòng để lấy bình luận
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy bình luận thành công
 *       404:
 *         description: Không có bình luận nào cho phòng này
 *       500:
 *         description: Lỗi khi lấy bình luận
 */

// LOCATION

/**
 * @swagger
 * /vi-tri:
 *   get:
 *     summary: Lấy danh sách vị trí
 *     description: Lấy danh sách vị trí. Cần đăng nhập.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách vị trí
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       ten_vi_tri:
 *                         type: string
 *                       tinh_thanh:
 *                         type: string
 *                       quoc_gia:
 *                         type: string
 *                       hinh_anh:
 *                         type: string
 *       500:
 *         description: Lỗi khi lấy danh sách vị trí
 *   post:
 *     summary: Thêm vị trí mới
 *     description: Thêm một vị trí mới. Chỉ admin mới được dùng.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tenViTri:
 *                 type: string
 *               tinhThanh:
 *                 type: string
 *               quocGia:
 *                 type: string
 *               hinhAnh:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vị trí đã được thêm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     ten_vi_tri:
 *                       type: string
 *                     tinh_thanh:
 *                       type: string
 *                     quoc_gia:
 *                       type: string
 *                     hinh_anh:
 *                       type: string
 *       500:
 *         description: Lỗi khi thêm vị trí
 * 
 * /vi-tri/phan-trang-tim-kiem:
 *   get:
 *     summary: Phân trang và tìm kiếm vị trí
 *     description: Phân trang và tìm kiếm vị trí. Cần đăng nhập.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *       - name: search
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kết quả tìm kiếm và phân trang
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       ten_vi_tri:
 *                         type: string
 *                       tinh_thanh:
 *                         type: string
 *                       quoc_gia:
 *                         type: string
 *                       hinh_anh:
 *                         type: string
 *       500:
 *         description: Lỗi khi lấy danh sách vị trí
 * 
 * /vi-tri/{id}:
 *   get:
 *     summary: Lấy vị trí theo ID
 *     description: Lấy thông tin vị trí theo ID. Cần đăng nhập.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thông tin vị trí
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     ten_vi_tri:
 *                       type: string
 *                     tinh_thanh:
 *                       type: string
 *                     quoc_gia:
 *                       type: string
 *                     hinh_anh:
 *                       type: string
 *       404:
 *         description: Không tìm thấy vị trí
 *       500:
 *         description: Lỗi khi lấy thông tin vị trí
 * 
 *   put:
 *     summary: Chỉnh sửa vị trí theo ID
 *     description: Cập nhật thông tin vị trí. Chỉ admin mới được dùng.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tenViTri:
 *                 type: string
 *               tinhThanh:
 *                 type: string
 *               quocGia:
 *                 type: string
 *               hinhAnh:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật vị trí thành công
 *       404:
 *         description: Không tìm thấy vị trí
 *       500:
 *         description: Lỗi khi cập nhật vị trí
 * 
 *   delete:
 *     summary: Xóa vị trí theo ID
 *     description: Xóa vị trí. Chỉ admin mới được dùng.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa vị trí thành công
 *       404:
 *         description: Không tìm thấy vị trí
 *       500:
 *         description: Lỗi khi xóa vị trí
 * 
 * /vi-tri/upload-hinh-vitri:
 *   post:
 *     summary: Tải lên hình ảnh cho vị trí
 *     description: Tải lên hình ảnh cho vị trí. Chỉ admin mới được dùng.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               hinhAnh:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Tải lên hình ảnh thành công
 *       400:
 *         description: Không có file hình ảnh được gửi
 *       404:
 *         description: Không tìm thấy vị trí
 *       500:
 *         description: Lỗi khi tải lên hình ảnh
 */ 


// ROOM
/**
 * @swagger
 * /phong-thue:
 *   get:
 *     summary: Lấy danh sách phòng thuê
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách phòng thành công
 *       500:
 *         description: Lỗi khi lấy danh sách phòng
 */

/**
 * @swagger
 * /phong-thue:
 *   post:
 *     summary: Tạo phòng thuê
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tenPhong:
 *                 type: string
 *               khach:
 *                 type: integer
 *               phongNgu:
 *                 type: integer
 *               giuong:
 *                 type: integer
 *               phongTam:
 *                 type: integer
 *               moTa:
 *                 type: string
 *               giaTien:
 *                 type: number
 *               mayGiat:
 *                 type: boolean
 *               banLa:
 *                 type: boolean
 *               tivi:
 *                 type: boolean
 *               dieuHoa:
 *                 type: boolean
 *               wifi:
 *                 type: boolean
 *               bep:
 *                 type: boolean
 *               doXe:
 *                 type: boolean
 *               hoBoi:
 *                 type: boolean
 *               banUi:
 *                 type: boolean
 *               maViTri:
 *                 type: integer
 *               hinhAnh:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo phòng thành công
 *       500:
 *         description: Lỗi khi tạo phòng
 */

/**
 * @swagger
 * /phong-thue/lay-phong-theo-vi-tri:
 *   get:
 *     summary: Lấy phòng theo mã vị trí
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: ma_vi_tri
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy danh sách phòng thành công
 *       404:
 *         description: Không tìm thấy phòng cho vị trí này
 *       500:
 *         description: Lỗi khi lấy danh sách phòng
 */

/**
 * @swagger
 * /phong-thue/phan-trang-tim-kiem:
 *   get:
 *     summary: Phân trang và tìm kiếm phòng
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy danh sách phòng thành công
 *       404:
 *         description: Không tìm thấy phòng
 *       500:
 *         description: Lỗi khi lấy danh sách phòng
 */

/**
 * @swagger
 * /phong-thue/{id}:
 *   get:
 *     summary: Lấy thông tin phòng theo ID
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy thông tin phòng thành công
 *       404:
 *         description: Không tìm thấy phòng
 *       500:
 *         description: Lỗi khi lấy thông tin phòng
 */

/**
 * @swagger
 * /phong-thue/{id}:
 *   put:
 *     summary: Cập nhật thông tin phòng theo ID
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tenPhong:
 *                 type: string
 *               khach:
 *                 type: integer
 *               phongNgu:
 *                 type: integer
 *               giuong:
 *                 type: integer
 *               phongTam:
 *                 type: integer
 *               moTa:
 *                 type: string
 *               giaTien:
 *                 type: number
 *               mayGiat:
 *                 type: boolean
 *               banLa:
 *                 type: boolean
 *               tivi:
 *                 type: boolean
 *               dieuHoa:
 *                 type: boolean
 *               wifi:
 *                 type: boolean
 *               bep:
 *                 type: boolean
 *               doXe:
 *                 type: boolean
 *               hoBoi:
 *                 type: boolean
 *               banUi:
 *                 type: boolean
 *               maViTri:
 *                 type: integer
 *               hinhAnh:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật phòng thành công
 *       404:
 *         description: Không tìm thấy phòng
 *       500:
 *         description: Lỗi khi cập nhật phòng
 */

/**
 * @swagger
 * /phong-thue/{id}:
 *   delete:
 *     summary: Xóa phòng theo ID
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa phòng thành công
 *       404:
 *         description: Không tìm thấy phòng
 *       500:
 *         description: Lỗi khi xóa phòng
 */

/**
 * @swagger
 * /phong-thue/upload-hinh-phong:
 *   post:
 *     summary: Tải lên hình ảnh phòng
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Tải lên hình ảnh thành công
 *       404:
 *         description: Không tìm thấy phòng
 *       500:
 *         description: Lỗi khi tải lên hình ảnh
 */