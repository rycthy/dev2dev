import { GET_ERRORS } from '../actions/types';

const initialState = {};
// TODO: add CLEAR_ERRORS case
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};
