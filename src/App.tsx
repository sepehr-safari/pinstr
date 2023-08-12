import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SimplePool } from 'nostr-tools';

import AppRouter from '@/routes';

const queryClient = new QueryClient();
const pool = new SimplePool();
const relays = ['wss://relay.nostr.band', 'wss://nos.lol'];
const kinds = [33888];

export default function App() {
  queryClient.setQueryData(['app', 'pool'], pool);
  queryClient.setQueryData(['app', 'relays'], relays);
  queryClient.setQueryData(['app', 'kinds'], kinds);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}
