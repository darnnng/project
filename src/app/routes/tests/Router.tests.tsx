import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { customHookWrapper, customRender } from '@src/shared/lib/utils.tests';
import { App } from '@src/app/App';
import LogInPage from '@src/pages/LogInPage/LogInPage';

describe('Router tests', () => {
  test('Page render test', () => {
    act(() => {
      render(<App />, { wrapper: customHookWrapper });
      customRender(<LogInPage />);
    });
    const signupLink = screen.getByTestId('signup-link');
    fireEvent.click(signupLink);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});
