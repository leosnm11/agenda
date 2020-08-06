import axios from 'axios';

export default axios.create({
  baseURL: 'https://app-agenta-flux.herokuapp.com/',
  headers: {
    'Content-type': 'application/json',
  },
});
