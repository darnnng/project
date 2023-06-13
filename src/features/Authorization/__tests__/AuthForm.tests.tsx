import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { customRender } from '@shared/lib/utils.tests';
import { AuthForm } from '../ui/AuthForm';

describe('Auth form tests', () => {
  let mockOnSubmit;
  let mockButtonName;

  beforeEach(() => {
    mockOnSubmit = jest.fn();
    mockButtonName = 'Sign in';
    customRender(<AuthForm onSubmit={mockOnSubmit} buttonName={mockButtonName} />);
  });

  test('password input check', () => {
    const inputElement = screen.getByTestId('password-input');
    expect(inputElement).toBeInTheDocument();
    act(() => {
      fireEvent.input(inputElement, {
        target: {
          value: '111',
        },
      });
    });
    expect(inputElement).toHaveValue('111');
  });

  test('button submit handler', async () => {
    const buttonElement = screen.getByTestId('submitBtn');
    const errorMessage = screen.getByTestId('alert1');
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    await waitFor(() => {
      expect(errorMessage).toHaveTextContent('passwordRequired');
    });
  });
});
