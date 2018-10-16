const Validator = require('validator');
const isEmpty = require('./is-empty');
// TODO: standardize post-submission validation e.g. jon doe should be Jon Doe (if // that's the chosen standard)

module.exports = function validateExperienceInput(data) {
  let errors = {};

  // TODO: refactor to be less verbose
  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Please enter your title';
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = 'Please enter your company';
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = 'Please enter when you started this position';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
