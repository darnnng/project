import * as React from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@src/shared/lib/queryClientOptions';
import { AppRouter } from './routes';
import './App.module.scss';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
};
