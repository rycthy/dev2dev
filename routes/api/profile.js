const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// Load Profile model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public

router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public

router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then((profiles) => {
      if (!profiles || profiles.length === 0) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      return res.json(profiles);
    })
    .catch((err) => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/profile/handle/:handle (backend route)
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      return res.json(profile);
    })
    .catch((err) => res.json(err));
});

// @route   GET api/profile/user/:user_id (backend route)
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      return res.json(profile);
    })
    .catch((err) => res.json({ profile: 'There is no profile for this user' }));
});

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// TODO: bug: user can change their handle to another users if they are editing thier profile
// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const {
      skills,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram
    } = req.body;
    const profileFields = {
      ...req.body,
      user: req.user.id,
      skills: skills.split(','),
      social: { youtube, twitter, facebook, linkedin, instagram }
    };

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = 'That handle already exists';
            return res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields)
            .save()
            .then((profile) => res.json(profile));
        });
      }
    });
  }
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private

router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        const newExp = req.body;
        profile.experience.unshift(newExp);
        profile
          .save()
          .then((profile) => res.json(profile))
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  }
);

// @route   POST api/profile/edcuation
// @desc    Add education to profile
// @access  Private

router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        const newEdu = req.body;
        profile.education.unshift(newEdu);
        profile
          .save()
          .then((profile) => res.json(profile))
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  }
);

// @route   DELETE api/profile/experience/:exp.id
// @desc    Delete experience item from profile
// @access  Private

router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        // Filter out requested experience item
        const updatedExperience = profile.experience.filter(
          (item) => !(item.id === req.params.exp_id)
        );
        profile.experience = updatedExperience;
        return profile.save();
      })
      .then((profile) => res.json(profile))
      .catch((err) => res.status(400).json(err));
  }
);

// @route   DELETE api/profile/education/:edu.id
// @desc    Delete education item from profile
// @access  Private

router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        // Filter out requested experience item
        const updatedEducation = profile.education.filter(
          (item) => !(item.id === req.params.edu_id)
        );
        profile.education = updatedEducation;
        return profile.save();
      })
      .then((profile) => res.json(profile))
      .catch((err) => res.status(400).json(err));
  }
);

// @route   DELETE api/profile/
// @desc    Delete user and profile
// @access  Private

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      })
      .catch((err) => res.status(400).json(err));
  }
);

module.exports = router;
