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