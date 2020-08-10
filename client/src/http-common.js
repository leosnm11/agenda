import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const { REACT_APP_URLS } = process.env;
// console.log(URLS);

export default axios.create({
  baseURL: `${REACT_APP_URLS}`,
  headers: {
    'Content-type': 'application/json',
  },
});
