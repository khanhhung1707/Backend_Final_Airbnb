import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import bcrypt from 'bcrypt';
import { responseData } from '../config/response.js';
import { createToken } from '../config/jwt.js';

const model = initModels(sequelize);

export const signUp = async (req, res) => {
    const { name, email, pass_word, phone, birth_day, gender, role, avatar } = req.body;

    try {
        // Kiểm tra email đã tồn tại chưa
        const existingUser = await model.NguoiDung.findOne({ where: { email } });

        if (existingUser) {
            return responseData("", "Email đã tồn tại!", 409, res);
        }

        // Mã hóa mật khẩu
        const hashedPassword = bcrypt.hashSync(pass_word, 10);

        // Tạo người dùng mới
        const newUser = {
            name,
            email,
            pass_word: hashedPassword,
            phone,
            birth_day,
            gender,
            role,
            avatar  
        };

        const createdUser = await model.NguoiDung.create(newUser);

        // Tạo token cho người dùng mới
        const token = createToken({ id: createdUser.id, email: createdUser.email, role: createdUser.role, avatar: createdUser.avatar });

        // Trả về phản hồi với token
        return responseData({
            token,
            user: {
                id: createdUser.id,
                name: createdUser.name,
                email: createdUser.email,
                role: createdUser.role,
                avatar: createdUser.avatar
            }
        }, "Đăng ký thành công", 201, res);
    } catch (error) {
        return responseData("", "Lỗi khi đăng ký", 500, res);
    }
};
export const login = async (req, res) => {
    const { email, pass_word } = req.body;
  
    try {
      // Tìm người dùng theo email
      const user = await model.NguoiDung.findOne({
        where: { email }
      });
  
      if (!user) {
        return responseData("", "Email không tồn tại!", 404, res);
      }
  
      // So sánh mật khẩu
      const isPasswordValid = bcrypt.compareSync(pass_word, user.pass_word);
  
      if (!isPasswordValid) {
        return responseData("", "Mật khẩu không chính xác!", 401, res);
      }
  
      // Tạo token cho người dùng, bao gồm role
      const token = createToken({ id: user.id, email: user.email, role: user.role });
  
      // Trả về phản hồi với token
      return responseData({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }, "Đăng nhập thành công", 200, res);
    } catch (error) {
      return responseData("", "Lỗi khi đăng nhập", 500, res);
    }
  };
  