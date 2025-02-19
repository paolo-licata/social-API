const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");
const { createPost, getPosts } = require("../controllers/postControllers");

router.post("/", verifyToken, createPost);
router.get("/", getPosts);

module.exports = router;