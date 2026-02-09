'use client';

import { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { attachInterceptors } from '@/store/attachInterceptors';

// Dynamic import for AdminAuthWrapper (no SSR)
const AdminAuthWrapper = dynamic(
  () =>
    import('@/components/adminUI/adminAuth').then(
      (mod) => mod.AdminAuthWrapper
    ),
  { ssr: false }
);

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    attachInterceptors(); // ✅ interceptor একবার attach হবে
  }, []);

  return (
    <Provider store={store}>
      <AdminAuthWrapper>
        {children}

        {/* react-toastify */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          pauseOnHover
          closeOnClick
        />

        {/* react-hot-toast */}
        <Toaster position="top-center" />
      </AdminAuthWrapper>
    </Provider>
  );
}
