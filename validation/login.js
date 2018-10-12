const Validator = require('validator');
const isEmpty = require('./is-empty');
// TODO: standardize post-submission validation e.g. jon doe should be Jon Doe (if // that's the chosen standard)

module.exports = function validateLoginInput(data) {
  let errors = {};

  // TODO: refactor to be less verbose
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = "Hmm, that's not a valid email";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "We need an email to create your profile";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Please enter your password";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}