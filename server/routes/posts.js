const express = require('express');
const { getPost, getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch } = require('../controllers/posts')
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:id', getPost)
router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/search', getPostsBySearch)

module.exports = router