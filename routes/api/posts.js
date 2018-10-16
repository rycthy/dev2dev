const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Import Models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public

router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsfound: 'No posts found' }));
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post)
        res
          .status(404)
          .json({ nopostfound: 'Oops! Looks like that post is no more' });

      return res.json(post);
    })
    .catch((err) =>
      res.status(404).json({ nopostfound: 'No post found with that id' })
    );
});

// @route   POST api/posts
// @desc    Create post
// @access  Private

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      ...req.body,
      user: req.user.id
    });

    newPost
      .save()
      .then((post) => res.json(post))
      .catch((err) => res.status(400).json(err));
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post by post ID
// @access  Private

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        // Authorize post owner
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: 'User not authorized' });
        }

        return post
          .remove()
          .then(() => res.json({ success: true }))
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private

router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (!post) {
          return res
            .status(404)
            .json({ nopostfound: 'Oops! Looks like that post is no more' });
        } else if (
          post.likes.filter((like) => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: 'User already liked this post' });
        }

        post.likes.unshift({ user: req.user.id });
        post
          .save()
          .then((post) => res.json(post))
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private

router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (!post) {
          return res
            .status(404)
            .json({ nopostfound: 'Oops! Looks like that post is no more' });
        } else if (
          post.likes.filter((like) => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: 'You have not yet liked this post' });
        }
        const updatedLikes = post.likes.filter(
          (like) => like.user.toString() !== req.user.id
        );
        post.likes = updatedLikes;
        post
          .save()
          .then((post) => res.json(post))
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to a post
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then((post) => {
        if (!post) {
          return res
            .status(404)
            .json({ nopostfound: 'Oops! Looks like that post is no more' });
        }
        const newComment = {
          ...req.body,
          user: req.user.id
        };
        post.comments.unshift(newComment);
        post
          .save()
          .then((post) => res.json(post))
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (!post) {
          return res
            .status(404)
            .json({ nopostfound: 'Oops! Looks like that post is no more' });
        } else if (
          !post.comments.find(
            (comment) => comment._id.toString() === req.params.comment_id
          )
        ) {
          return res.status(404).json({ nocomment: 'Comment does not exist' });
        } else if (
          post.comments
            .find((comment) => comment._id.toString() === req.params.comment_id)
            .user.toString() !== req.user.id.toString()
        ) {
          return res.status(401).json({
            notauthorized: 'User not authorized to delete this comment'
          });
        }
        const updatedComments = post.comments.filter(
          (comment) => comment._id.toString() !== req.params.comment_id
        );
        post.comments = updatedComments;
        post
          .save()
          .then((post) => res.json(post))
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

module.exports = router;
