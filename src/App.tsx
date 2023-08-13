import { Query, QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { SimplePool } from 'nostr-tools';

import AppRouter from '@/routes';

import { createIDBPersister } from './utils';

const persister = createIDBPersister();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 48, // 48 hours
    },
  },
});

const pool = new SimplePool();
const relays = ['wss://relay.nostr.band', 'wss://nos.lol'];
const kinds = [33888];

export default function App() {
  queryClient.setQueryData(['app', 'pool'], pool);
  queryClient.setQueryData(['app', 'relays'], relays);
  queryClient.setQueryData(['app', 'kinds'], kinds);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        dehydrateOptions: {
          shouldDehydrateQuery: (query: Query) =>
            query.state.status === 'success' &&
            query.queryKey.includes('pool') === false,
        },
      }}
    >
      <AppRouter />
    </PersistQueryClientProvider>
  );
}
