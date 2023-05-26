import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import '@shared/lib/i18n/i18n';
import { store } from '@src/app/store';
import { queryClient } from '@src/shared/lib/queryClientOptions';

const Providers: React.FC = ({ children }: React.PropsWithChildren<object>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

export const customRender = (ui: React.ReactElement) => render(ui, { wrapper: Providers });
