import axios from 'axios';

export default (token) =>
  token
    ? (axios.defaults.headers.common['Authorization'] = token)
    : delete axios.defaults.headers.common['Authorization'];
