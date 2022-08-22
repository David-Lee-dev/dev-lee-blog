import axios from 'axios';

const BASE_URL = 'http://im-dev-lee.site/';

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-type': 'application/json',
    },
  });

  return axiosInstance;
};

export const axiosInstance = createAxiosInstance();
