const express = require('express');
const router = express.Router();
const { getCategories, createCategory, deleteCategory } = require('../controllers/category.controller');
const protectAdmin = require('../middleware/auth.middleware');

router.get('/', getCategories);
router.post('/', protectAdmin, createCategory);
router.delete('/:id', protectAdmin, deleteCategory);

module.exports = router;
