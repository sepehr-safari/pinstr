import NDK, { NDKPrivateKeySigner, NDKSigner } from '@nostr-dev-kit/ndk';
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie';
import { useNostrHooks } from 'nostr-hooks';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import { AppRouter } from '@/pages';

import { ThemeProvider } from '@/shared/components/theme-provider';
import { Toaster } from '@/shared/components/ui/toaster';

let signer: NDKSigner | undefined = undefined;
const pk = localStorage.getItem('pk');
if (pk) {
  signer = new NDKPrivateKeySigner(pk);
}

const ndk = new NDK({
  autoConnectUserRelays: false,
  autoFetchUserMutelist: false,
  cacheAdapter: new NDKCacheAdapterDexie({ dbName: 'pinstr' }),
  explicitRelayUrls: ['wss://nos.lol'],
  signer,
});

export const App = () => {
  useNostrHooks(ndk);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>

      <Toaster />
    </ThemeProvider>
  );
};
