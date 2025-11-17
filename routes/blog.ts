// routes/blog.js
const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/auth');
const BlogPost = require('../models/BlogPost');

// Only admins can create blog posts
router.post('/posts', requireAdmin, async (req, res) => {
  try {
    const { title, content, excerpt, featuredImage, tags } = req.body;
    
    const blogPost = new BlogPost({
      title,
      content,
      excerpt,
      featuredImage,
      tags,
      author: req.user.id,
      status: 'published' // or 'draft' based on your needs
    });

    await blogPost.save();
    res.status(201).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Only admins can update blog posts
router.put('/posts/:id', requireAdmin, async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Only admins can delete blog posts
router.delete('/posts/:id', requireAdmin, async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Public can still view published posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await BlogPost.find({ status: 'published' })
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Public can view individual published posts
router.get('/posts/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ 
      slug: req.params.slug, 
      status: 'published' 
    }).populate('author', 'name');
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;