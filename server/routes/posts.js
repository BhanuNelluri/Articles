import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();
import { getPosts, getPost, create, update, deletePost, likePost } from '../controllers/posts.js'

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, create);
router.patch('/:id', auth, update);
router.delete('/:id', auth, deletePost);
router.patch('/:id/like', auth, likePost);

export default router;