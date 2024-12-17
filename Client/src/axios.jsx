import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-zingmp3-vercel.vercel.app/api",
});

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
// baseURL: 'http://mp3.zing.vn/xhr/chart-realtime'
