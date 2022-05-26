import mongoose from 'mongoose';
import Articles from '../models/Articles.js'

export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 10;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await Articles.countDocuments({});
        const posts = await Articles.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Articles.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const create = async (req, res) => {
    const post = req.body;
    const newPost = new Articles({ ...post, creator: req.userId });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const update = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const post = req.body;
    try {
        const updatedPost = await Articles.findByIdAndUpdate(_id, { ...post, creator: req.userId }, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    try {
        await Articles.findByIdAndDelete(_id);
        res.json("Post Deleted");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    try {
        const post = await Articles.findById(id);

        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }
        const updatedPost = await Articles.findByIdAndUpdate(id, post, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}