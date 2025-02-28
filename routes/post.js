const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");
const { createPost, getPosts, deletePost } = require("../controllers/postControllers");

router.post("/", verifyToken, createPost);
router.get("/", getPosts);
router.delete("/:id", verifyToken, deletePost);

module.exports = router;