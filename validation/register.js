const Validator = require('validator');
const isEmpty = require('./is-empty');
// TODO: standardize post-submission validation e.g. jon doe should be Jon Doe (if // that's the chosen standard)

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // TODO: refactor to be less verbose
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Your name must be between 2 and 30 characters';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'We need a name to create your profile';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Hmm, that's not a valid email";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'We need an email to create your profile';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Your password must be be between 6 and 30 characters';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'You need to create a password';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Oops! Your passwords don't match";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Please confirm your password';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
