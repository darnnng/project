import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
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

  test('button submit handler', async () => {
    const buttonElement = screen.getByTestId('submitBtn');
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    await waitFor(() => {
      const errorMessage = screen.getByTestId('alert2');
      expect(errorMessage).toHaveTextContent('password is a required field');
    });
  });

  test('validation on submit', async () => {
    const buttonElement = screen.getByTestId('submitBtn');
    const inputElement = screen.getByPlaceholderText('Enter email');
    expect(inputElement).toBeInTheDocument();

    fireEvent.input(inputElement, {
      target: {
        value: 'test@',
      },
    });

    fireEvent.click(buttonElement);
    await waitFor(() => {
      const errorMessage = screen.getByTestId('alert1');
      expect(errorMessage).toHaveTextContent('email must be a valid email');
    });
  });

  test('password input check', () => {
    const inputElement = screen.getByPlaceholderText('Enter password');
    expect(inputElement).toBeInTheDocument();

    fireEvent.input(inputElement, {
      target: {
        value: '111',
      },
    });
    expect(inputElement).toHaveValue('111');
  });
});
