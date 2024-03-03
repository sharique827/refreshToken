import express from 'express'
import { verifyToken } from '../middlewares/verifyUser'
import { validateBlogPost } from '../middlewares/validate'
import { getAllPosts, getPost, updatePost, deletePost, savePost } from '../controllers/blogPosts.controller'

const router = express.Router()

router.get('/posts', verifyToken, getAllPosts)
router.get('/posts/:id', verifyToken, getPost)
router.post('/posts', verifyToken, validateBlogPost, savePost)
router.put('/posts/:id', verifyToken, validateBlogPost, updatePost)
router.delete('/posts/:id', verifyToken, deletePost)

export { router as blogPostRouter }