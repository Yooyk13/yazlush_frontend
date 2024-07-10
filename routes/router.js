const express = require("express");
const { loginUser } = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();
const {
  createBlog,
  getBlogs,
  findBlog,
} = require("../controllers/blogController");
const multer = require("multer");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      file.originalname.substring(file.originalname.lastIndexOf("."));
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post("/blogs", upload.single("coverImage"), auth, createBlog);
router.get("/blogs", getBlogs);
router.get("/blog/:id", findBlog);

router.post("/login", loginUser);
// router.post("/login", (req, res) => {
//   res.send("hello");
// });

module.exports = router;
