const path = require("path");
const fs = require("fs");
const Post = require("../models/Post");
const User = require("../models/User");
const multer = require("multer");

// Define the upload directory and creates one if it is not found
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
};

//Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); //Stores the images in "uploads" folder
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename ); //Unique filename with timestamp
    }
})

const upload = multer({ storage: storage });

//Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("userId", "username")
            .populate("comments.userId", "username");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch posts" });
    }
}

// Create a new post
exports.createPost  = async (req, res) => {
    try {        
        const { description } = req.body;
        const userId = req.user.id;
        let imageUrl = "";

        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`
        };

        const newPost = new Post({
            userId,
            description,
            imageUrl
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error("Error creating Post:", error);
        res.status(500).json({ message: "Failed to create post.", error: error.message });
    }
}

// Delete a post if user is owner of the post
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id; // Post ID from the URL
        const userId = req.user.id; // User ID from the JWT token

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found."});

        // Check if the user is the owner of the post
        if (post.userId.toString() !== userId) {
            return res.status(400).json({ message: "You are not the owner of the post."});
        }

        //Delete the post
        await Post.findByIdAndDelete(postId);
        res.status(200).json({ message: "Post deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete post.", error });
    }
}

//Add a comment to a post
exports.createComment = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user.id;
        const post = await Post.findById(postId);

        if (!text) {
            return res.status(400).json({ message: "Comment cannot be empty." });
        }

        post.comments.push({ userId, text });
        await post.save();

        res.status(201).json({ message: "Comment added successfully.", post });
    } catch (error) {
        res.status(500).json({ message: "Failed to add comment.", error });
    }
}

// Delete a comment from a post
exports.deleteComment = async (req, res) => {
    try {
        const { id: postId, commentId } = req.params;
        const userId = req.user.id;
        
        // Check if post and comment exist
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found."});

        const comment = post.comments.find((comm) => comm._id.toString() === commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found."});

        // Check if the user is the owner of the comment
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ message: "You are not the owner of the comment."});
        }

        //Delete the comment
        post.comments = post.comments.filter((comm) => comm._id.toString() !== commentId);
        await post.save();
        res.json({ message: "Comment deleted successfully.", post });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete comment.", error });
    }
}

// Like or unlike a post
exports.likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found."});

        const numLikes = post.likes.indexOf(userId);
        if (numLikes === -1) {
            post.likes.push(userId);
            res.json({ message: "Post liked.", post });
        } else {
            post.likes.splice(numLikes, 1);
            res.json({ message: "Like removed.", post });
        }

        await post.save();
    } catch (error) {
       res.status(500).json({ message: "Failed to like post.", error });
    }
}

module.exports.upload = upload;