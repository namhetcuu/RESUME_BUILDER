const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();//Tạo một instance router độc lập để định nghĩa các route cho phần auth.

router.post('/register', registerUser);// Register a new user
router.post('/login', loginUser);// Login a user
router.get('/profile', protect, getUserProfile);// Get user profile

router.post('/upload-images', upload.single('image'), async (req, res) => {
    if(!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    //Nếu có, tạo link ảnh để truy cập công khai:
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});
module.exports = router;