const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage');

const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).send({error: null, message: 'Success', data: postMessages});
    } catch(error) {
        res.status(500).send({error: true, message: 'Something went wrong', data: []})
    }
}

const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
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
        console.log("DELETED!!")
        res.status(200).send({
            error: null, message: 'Post deleted successfully'
        })
    } catch(error) {
        console.log(error.message);
    }
}

const likePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send({
            error: true, message: `No post found with id ${_id}`
        })
        const post = await PostMessage.findById(_id);
        console.log('POST: ', post.likeCount)
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, likeCount: post.likeCount++}, {new: true});
        console.log('Updated POST: ',updatedPost.likeCount)
        res.status(200).send({
            error: null, message: 'Successfully updated the like count', data: updatedPost
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost
}