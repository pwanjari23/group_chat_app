const multer = require("multer");

const storage = multer.memoryStorage(); // store file in memory buffer

const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB limit
  },
});

fileFilter: (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "video/mp4",
    "application/pdf",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error("Unsupported file type"), false);
  }

  cb(null, true);
};

module.exports = upload;
