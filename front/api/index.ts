import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_REQUEST_BASE_URL;

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
