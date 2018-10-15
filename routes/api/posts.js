const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');

// Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public

router.get('/test',
  (req, res) => res.json({ msg: "Posts Works" }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404));
});

// @route   POST api/posts
// @desc    Create post
// @access  Private

router.post('/', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      ...req.body,
      user: req.user.id
    });

    newPost.save().then((post) => res.json(post))
      .catch((err) => res.status(400).json(err));
  });

module.exports = router;