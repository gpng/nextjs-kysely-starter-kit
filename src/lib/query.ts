import { QueryClient, QueryClientConfig } from '@tanstack/react-query';
import { cache } from 'react';

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

// for SSR use
const getQueryClient = cache(() => new QueryClient(queryClientConfig));

export default getQueryClient;
