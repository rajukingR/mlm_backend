const multer = require('multer');
const path = require('path');

const uploadsPath = path.resolve(__dirname, '../uploads'); 


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, 'uploads/');
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 },
});

module.exports = upload;
