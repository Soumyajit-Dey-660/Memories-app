const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage');

const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostMessage.findById(id);
        res.status(200).send({
            error: null,
            message: 'Success',
            data: post
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            error: true,
            message: 'Something went worng',
        })
    }
}

const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8; // No of posts per page
        const startIndex = (Number(page) - 1) * LIMIT; // Get the starting index of every page
        const total = await PostMessage.countDocuments({}); // Get the total number of memories.
        // It is needed to calculate the number of pages we currently have
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex) // Newest to oldest and skip all the memories till startIndex
        res.status(200).send({error: null, message: 'Success', data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch(error) {
        console.log(error);
        res.status(500).send({error: true, message: 'Something went wrong', data: []})
    }
}

const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        res.status(201).send({error: null, message: 'Success', data: newPost})
    } catch (error) {
        res.status(500).send({ error: true, messgae: 'Something went wrong!', data: [] })
    }
}

const updatePost = async (req, res) => {
    try{
        const { id: _id } = req.params;
        const post = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send({ error: null, message: `No post with the id: ${_id}`})
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });
        res.status(200).send({ error: null, message: 'Post updated', data: updatedPost })
    } catch(error) {
        console.log(error);
    }
}

const deletePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send({
            error: null, message: `No Post found with id ${_id}`
        })
        await PostMessage.findByIdAndRemove(_id);
        res.status(200).send({
            error: null, message: 'Post deleted successfully'
        })
    } catch(error) {
        console.log(error.message);
    }
}

const likePost = async (req, res) => {
    try {
        if (!req.userId) res.status(401).send({
            error: null,
            message: 'Unauthenticated'
        })
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send({
            error: true, message: `No post found with id ${_id}`
        })
        const post = await PostMessage.findById(_id);

        const index = post.likes.findIndex(id  => id === String(req.userId))
        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter(id => id !== String(req.userId))
        }
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});
        res.status(200).send({
            error: null, message: 'Successfully updated the like count', data: updatedPost
        })
    } catch (error) {
        console.log(error.message)
    }
}

const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, 'i'); // Test, TEST, test -> test
        // $or -> Either or one of the title, tags.
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ] }) 
        res.status(200).send({
            error: null,
            message: 'Posts with similar title or tags',
            data: posts
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: true,
            message: 'Something went wrong'
        })
    }
}

module.exports = {
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPostsBySearch
}