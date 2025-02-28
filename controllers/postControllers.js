const Post = require("../models/Post");

// Create a new post
exports.createPost  = async (req, res) => {
    try {        
        const { description, imageUrl} = req.body;
        const userId = req.user.id;

        const newPost = new Post({
            userId,
            description,
            imageUrl: imageUrl || ""
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error("Error creating Post:", error);
        res.status(500).json({ message: "Failed to create post.", error: error.message });
    }
}

//Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch posts" });
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