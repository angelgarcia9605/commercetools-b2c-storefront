// API client configuration and interceptors
import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import config from './config';
import { getAccessToken } from './commercetools/auth';

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: config.commercetools.apiUrl,
    timeout: 10000,
  });

  // Request interceptor
  client.interceptors.request.use(
    async (config) => {
      try {
        // Get access token from commercetools
        const token = await getAccessToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Failed to set authorization header:', error);
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
        // Handle unauthorized - clear token cache
        const { clearTokenCache } = require('./commercetools/auth');
        clearTokenCache();
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export default createApiClient();
