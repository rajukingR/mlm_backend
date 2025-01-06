const multer = require('multer');
const path = require('path');

// Define storage settings for files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with unique timestamp and original extension
  },
});

// File filter to allow only image, PDF, or ZIP files
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image/') ||
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/zip'
  ) {
    cb(null, true); // Allow file upload
  } else {
    cb(new Error('Only image, PDF, and ZIP files are allowed!'), false); // Reject file
  }
};

// Set file size limit to 10MB
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 },
});

module.exports = upload;
