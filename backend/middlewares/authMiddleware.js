const jwt = require('jsonwebtoken');//Import thư viện jsonwebtoken để giải mã token.
const User = require('../models/User');//Import model User để truy xuất thông tin người dùng từ MongoDB.

//Định nghĩa middleware protect, nhận vào req, res, next.
const protect = async (req,res,next) => {
    try {
        let token = req.headers.authorization;//Lấy token từ header HTTP, cụ thể là từ Authorization.

        if(token && token.startsWith('Bearer')) {//Kiểm tra xem token có tồn tại và có đúng định dạng "Bearer <token>" không.
            token = token.split(' ')[1];//Nếu có, tách lấy phần token thực sự để xử lý tiếp.

            // Giải mã token bằng JWT_SECRET (được đặt trong biến môi trường .env).
            //Nếu token hợp lệ, nó trả lại thông tin đã mã hóa (thường chứa id người dùng).
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Tìm người dùng trong cơ sở dữ liệu bằng id lấy được từ token.
            //Gắn thông tin người dùng vào req.user để các middleware/route sau có thể sử dụng.
            //Bỏ qua trường password để không gửi mật khẩu ra ngoài.
            req.user = await User.findById(decoded.id).select('-password');

            //Gọi tiếp middleware tiếp theo trong chuỗi xử lý Express (cho phép tiếp tục xử lý route).
            next();
        } else {
            res.status(401).json({ message: 'Not authorized, no token' });
        }
    } catch (error) {
        res.status(401).json({ message: 'token failed' ,error:error.message});
    }
}

module.exports = { protect };