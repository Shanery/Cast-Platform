import axios from 'axios';

var user = 'root';
var password = 'waffl3c0pt3r';

export const HTTP = axios.create({
  baseURL: `http://localhost:2480/`,
  auth: {
    username: user,
    password: password
  }
})