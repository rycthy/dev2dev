const Validator = require('validator');
const isEmpty = require('./is-empty');
// TODO: standardize post-submission validation e.g. jon doe should be Jon Doe (if // that's the chosen standard)

module.exports = function validateEducationInput(data) {
  let errors = {};

  // TODO: refactor to be less verbose
  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.school)) {
    errors.school = "Please enter your school";
  }
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Please enter your degree";
  }
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Please enter your field of study";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "Please enter when you started this position";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}