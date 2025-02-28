const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");
const { createPost, 
        getPosts, 
        deletePost,
        createComment,
        deleteComment,
        likePost } = require("../controllers/postControllers");

router.get("/", getPosts);

// Creation and Deletion of Posts (require a valid token)
router.post("/", verifyToken, createPost);
router.delete("/:id", verifyToken, deletePost);

//Comments routing
router.post("/:id/comments", verifyToken, createComment);
router.delete("/:id/comments/:commentId", verifyToken, deleteComment);

//Likes routing
router.post("/:id/likes", verifyToken, likePost);

module.exports = router;