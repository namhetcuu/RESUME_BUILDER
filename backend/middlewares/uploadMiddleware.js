const multer = require('multer');

//Confiure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save the uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Use a unique filename
    }
});

//File filter
const fileFilter = (req,file,cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if(allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false); // Reject the file
    }
}

const upload = multer({storage, fileFilter});
module.exports = upload;