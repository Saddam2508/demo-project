// attachInterceptors.ts
'use client';

import api from '@/store/axiosInstance';
import refreshTokenAndRetry from '@/features/refreshToken/refreshTokenAndRetry';

export const attachInterceptors = () => {
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const status = error.response?.status;
      const originalRequest = error.config;
      const requestUrl = originalRequest?.url || '';

      const isAuthRelated =
        requestUrl.includes('/logout') ||
        requestUrl.includes('/admin-login') ||
        requestUrl.includes('/register');

      if (status === 401 && !isAuthRelated && originalRequest) {
        return refreshTokenAndRetry(originalRequest);
      }

      return Promise.reject(error);
    }
  );
};
