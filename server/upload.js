const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/\s/g, ""));
  }
});

const upload = multer({ storage });

module.exports = upload;
