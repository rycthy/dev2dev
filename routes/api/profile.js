const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile model
const Profile = require('../../models/Profile');
// Load User Profile (??)
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access    Public

router.get('/test',
  (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user'
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  });

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Get fields
    const { skills, youtube, twitter, facebook, linkedin, instagram } = req.body;
    const profileFields = {
      ...req.body,
      user: req.user.id,
      skills: skills.split(','),
      social: { youtube, twitter, facebook, linkedin, instagram }
    };

    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
            .then((profile) => res.json(profile));
        } else {
          // Create

          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle })
            .then((profile) => {
              if (profile) {
                errors.handle = 'That handle already exists';
                res.status(400).json(errors);
              }

              // Save Profile
              new Profile(profileFields)
                .save()
                .then((profile) => res.json(profile));
            });
        }
      })
  });

module.exports = router;