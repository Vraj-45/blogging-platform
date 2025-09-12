const Blog = require('../models/Blog');
const slugify = require('slugify');

const createSlug = (text) => {
  if (!text) return `${Date.now()}`;
  return slugify(text, { lower: true, strict: true });
};

const getBlogs = async (req, res) => {
  try {
    const { search, limit = 10, skip = 0, category } = req.query;
    const q = {};
    if (search) q.title = { $regex: search, $options: 'i' };
    if (category) q.category = category;
    const blogs = await Blog.find(q)
      .populate('category')
      .sort({ publishDate: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate('category');
    if (!blog) return res.status(404).json({ message: 'Not found' });
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, category, description, publishDate } = req.body;
    const slugBase = createSlug(title);
    let finalSlug = slugBase;
    const exists = await Blog.findOne({ slug: finalSlug });
    if (exists) finalSlug = `${slugBase}-${Date.now()}`;

    const thumbnail = req.files?.thumbnail?.[0]
    ? `/uploads/${req.files.thumbnail[0].filename}`
    : '';
    const featuredImage = req.files?.featuredImage?.[0]
    ? `/uploads/${req.files.featuredImage[0].filename}`
    : '';
    const newBlog = new Blog({
      title,
      slug: finalSlug,
      category,
      description,
      publishDate: publishDate || Date.now(),
      thumbnail: thumbnail ? thumbnail.replace(/^public/, '') : '',
      featuredImage: featuredImage ? featuredImage.replace(/^public/, '') : ''
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Not found' });

    const { title, category, description, publishDate, isPublished } = req.body;
    if (title && title !== blog.title) {
      blog.slug = createSlug(title);
    }
    blog.title = title ?? blog.title;
    blog.category = category ?? blog.category;
    blog.description = description ?? blog.description;
    blog.publishDate = publishDate ?? blog.publishDate;
    blog.isPublished = isPublished !== undefined ? isPublished : blog.isPublished;

    if (req.files?.thumbnail?.[0]) {
    blog.thumbnail = `/uploads/${req.files.thumbnail[0].filename}`;
    }
    if (req.files?.featuredImage?.[0]) {
    blog.featuredImage = `/uploads/${req.files.featuredImage[0].filename}`;
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog };
