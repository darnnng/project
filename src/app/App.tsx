import * as React from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@shared/lib/i18n/queryClientOptions';
import { AppRouter } from './routes';
import './App.module.scss';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
};
