import axios from 'axios';

const http = axios.create({
  baseURL: 'https://onchain.dextrading.com',
  // timeout: 20000,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default http;
