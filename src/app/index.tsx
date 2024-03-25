import { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
import { useNdk, useNostrHooks } from 'nostr-hooks';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import { AppRouter } from '@/pages';

import { ThemeProvider } from '@/shared/components/theme-provider';
import { Toaster } from '@/shared/components/ui/toaster';

export const App = () => {
  useNostrHooks();
  const { setSigner } = useNdk();

  useEffect(() => {
    const pk = localStorage.getItem('pk');
    pk && setSigner(new NDKPrivateKeySigner(pk));
  }, [setSigner]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>

      <Toaster />
    </ThemeProvider>
  );
};
