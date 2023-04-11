import express from 'express'
import { createBlog, deleteBlog, getAllBlogs, getBlogByUserId, getById, updateBlog } from '../controllers/blogController.js'
const router = express.Router()

router.get('/', getAllBlogs)
router.post('/add', createBlog)
router.put('/update/:id', updateBlog)
router.get('/:id',getById)
router.delete('/:id', deleteBlog)
router.get('/user/:id',getBlogByUserId)

export default router