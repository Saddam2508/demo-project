'use client';

import api from '@/store/axiosInstance';
import { store } from '@/store/store';
import handleLogoutRedirect from '@/utils/handleLogoutRedirect';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

const refreshTokenAndRetry = async (
  originalRequest: AxiosRequestConfig
): Promise<AxiosResponse> => {
  try {
    await api.post('/refresh-token');
    return api(originalRequest);
  } catch (error) {
    await handleLogoutRedirect('admin', store.dispatch);
    throw error;
  }
};

export default refreshTokenAndRetry;
