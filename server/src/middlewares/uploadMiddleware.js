const multer = require('multer');
const path = require('path');

// 🟢 Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/'); // যেখানে file save হবে
  },
  filename: function (req, file, cb) {
    // unique name: timestamp-originalname
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// 🟢 File filter (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

// 🟢 Multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;
