import multer, { diskStorage } from 'multer'

export const upload = multer({
    storage: diskStorage({
        destination: process.cwd() + "/public/imgs",
        filename: (req, file, callback) => {
            let newName = new Date().getTime() + "_" + file.originalname;
            callback(null, newName);
        }
    }),
    // Chỉ định các kiểu file hợp lệ nếu cần thiết
    fileFilter: (req, file, callback) => {
        const fileTypes = /jpeg|jpg|png|gif/; // Chấp nhận các định dạng hình ảnh
        const extname = fileTypes.test(file.mimetype) && fileTypes.test(file.originalname.split('.').pop());
        
        if (extname) {
            return callback(null, true);
        } else {
            callback("Error: File type not supported");
        }
    }
});