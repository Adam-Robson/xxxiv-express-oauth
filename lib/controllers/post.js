const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const Post = require('../models/Post.js');

module.exports = Router()

  .post('/', authenticate, async (req, res, next) => {
    try {
      const post = await Post.insert({
        description: req.body.description,
        user_id: req.user.id,
      });
      res.json(post);
    } catch (err) {
      next(err);
    }
  })

  .get('/', authenticate, async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      res.json(posts);
    } catch (err) {
      next(err);
    }
  });

