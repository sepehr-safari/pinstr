import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from 'pages';
import { useLocalStore } from 'shared/store';
import { Toast } from 'shared/components';
import { createIDBPersister } from 'shared/utils';

import './index.css';

const persister = createIDBPersister();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // cacheTime: 1000 * 60 * 60 * 48, // 48 hours
      // staleTime: 1000 * 60 * 1, // 1 minute
      cacheTime: Infinity,
      staleTime: Infinity,
      // refetchOnWindowFocus: false,
    },
  },
});

export const App = () => {
  const ndk = useLocalStore((state) => state.ndk);

  useEffect(() => {
    if (ndk) ndk.connect();
  }, [ndk]);

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>

      <Toast />
    </PersistQueryClientProvider>
  );
};
