const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public

router.get('/test',
  (req, res) => res.json({ msg: "Posts Works" }));

// @route   POST api/posts
// @desc    Create post
// @access  Private

router.post('/', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newPost = new Post({
      ...req.body
    });

    newPost.save().then((post) => res.json(post))
      .catch((err) => res.status(400).json(err));
  });

module.exports = router;