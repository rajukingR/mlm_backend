const multer = require('multer');
const path = require('path');

const uploadsPath = path.resolve(__dirname, '../uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath);  // Set destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Create unique filename based on timestamp
  },
});

const fileFilter = (req, file, cb) => {
  console.log('File MIME type:', file.mimetype);  // Log MIME type for debugging

  // Allow images, PDFs, and ZIP files
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/zip'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image, PDF files are allowed!'), false);  // Reject non-allowed file types
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },  // Set file size limit (5MB)
});

module.exports = upload;
