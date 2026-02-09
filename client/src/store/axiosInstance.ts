'use client';

import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// এখানে redux / store / redirect কিছুই নাই
api.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError) => Promise.reject(error)
);

export default api;
