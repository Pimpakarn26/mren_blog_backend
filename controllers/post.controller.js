const PostModel = require("../models/Post");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

exports.createPost = async (req, res) =>  {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }
    const { path: cover } = req.file;
    const author = req.userId;
    const { title, summary, content } = req.body;

    if (!title || !summary || !content) {
        return res.status(400).json({ message: "All Fields are required" });
    }

    const postDoc = await PostModel.create({
        title,
        summary,
        content,
        cover,
        author,
    });

    res.status(201).json({
        message: "Post created successfully",
        post: postDoc,
    });
};
