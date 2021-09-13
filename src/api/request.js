import axios from 'axios';

let requestInstance = null;

if (!requestInstance) {
  requestInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
}

requestInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

requestInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, statusText, data } = error.response;
      return Promise.reject({
        status,
        statusText,
        data,
      });
    }

    return Promise.reject(error);
  }
);

export default requestInstance;
