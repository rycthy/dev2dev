const Validator = require('validator');
const isEmpty = require('./is-empty');
// TODO: standardize post-submission validation e.g. jon doe should be Jon Doe (if // that's the chosen standard)

module.exports = function validatePostInput(data) {
  let errors = {};

  // TODO: refactor to be less verbose
  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 30 characters';
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "Please enter your text";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}