import { useNostrHooks } from 'nostr-hooks';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import { AppRouter } from '@/pages';

import { ThemeProvider } from '@/shared/components/theme-provider';
import { Toaster } from '@/shared/components/ui/toaster';

export const App = () => {
  useNostrHooks();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>

      <Toaster />
    </ThemeProvider>
  );
};
