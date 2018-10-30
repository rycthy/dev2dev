import axios from 'axios';
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER
} from './types';
import { getErrors } from './errorActions';

// Get current profile
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

// Get all profiles
export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then((res) =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_PROFILES,
        payload: null
      });
    });
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Create profile
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post('/api/profile', profileData)
    .then((res) => history.push('/dashboard'))
    .catch((err) => dispatch(getErrors(err.response.data)));
};

// Add experience
export const addExperience = (expData, history) => (dispatch) => {
  axios
    .post('/api/profile/experience', expData)
    .then((res) => history.push('/dashboard'))
    .catch((err) => dispatch(getErrors(err.response.data)));
};

// Add education
export const addEducation = (eduData, history) => (dispatch) => {
  axios
    .post('/api/profile/education', eduData)
    .then((res) => history.push('/dashboard'))
    .catch((err) => dispatch(getErrors(err.response.data)));
};

// Delete Experience
export const deleteExperience = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch((err) => dispatch(getErrors(err.response.data)));
};

// Delete Education
export const deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch((err) => dispatch(getErrors(err.response.data)));
};

// Delete account and profile
export const deleteAccount = () => (dispatch) => {
  if (window.confirm('Are you sure? This CANNOT be undone!')) {
    axios
      .delete('/api/profile')
      .then((res) =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch((err) => dispatch(getErrors(err.response.data)));
  }
};
