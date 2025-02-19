//Mongoose model for Posts
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
