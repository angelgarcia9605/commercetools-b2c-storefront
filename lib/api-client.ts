// API client configuration and interceptors
import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import config from './config';

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: config.commercetools.apiUrl,
    timeout: 10000,
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Add auth token if available
      const token = localStorage.getItem('commercetools_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Response interceptor
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Handle unauthorized
        localStorage.removeItem('commercetools_token');
        // Redirect to login if needed
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export default createApiClient();
