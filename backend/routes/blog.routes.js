const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const protectAdmin = require('../middleware/auth.middleware');
const { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } = require('../controllers/blog.controller');

// Public
router.get('/', getBlogs);
router.get('/slug/:slug', getBlogBySlug);
// Admin 
router.post('/', protectAdmin, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'featuredImage', maxCount: 1 }]), createBlog);
router.put('/:id', protectAdmin, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'featuredImage', maxCount: 1 }]), updateBlog);
router.delete('/:id', protectAdmin, deleteBlog);

module.exports = router;
