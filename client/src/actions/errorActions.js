import { GET_ERRORS } from './types';

export const getErrors = (err) => ({
  type: GET_ERRORS,
  payload: err
});

// TODO: add CLEAR_ERRORS action
