import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:5000/api';   // Android Emulator
// const API_BASE_URL = 'http://localhost:5000/api'; // Web / iOS

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});
aaccaec;
fhrhrhyyhr;
export default api;