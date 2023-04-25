import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { AppRouter } from './routes';
import './App.module.scss';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
};
