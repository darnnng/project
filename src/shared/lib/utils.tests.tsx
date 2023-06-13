import React from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { store } from '@src/app/store';
import { queryClient } from '@src/shared/lib/queryClientOptions';

export const Providers: React.FC = ({ children }: React.PropsWithChildren<object>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

export const customHookWrapper = ({ children }: { children?: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

export const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Providers, ...options });
