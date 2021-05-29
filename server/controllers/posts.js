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
    console.log(req.body)
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).send({error: null, message: 'Success', data: newPost})
    } catch (error) {
        res.status(500).send({ error: true, messgae: 'Something went wrong!', data: [] })
    }
}

module.exports = {
    getPosts,
    createPost
}