import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { t } from 'i18next';
import { customRender } from '@shared/lib/utils.tests';
import { Button } from '@src/shared/ui/Button';
import { InputText } from '@src/shared/ui/Input';
import { ValidationMessage } from '@src/shared/ui/ValidationMessage';
import { AuthForm } from '../ui/AuthForm';

describe('Auth form tests', () => {
  let mockOnSubmit;
  let mockButtonName;

  beforeEach(() => {
    mockOnSubmit = jest.fn();
    mockButtonName = 'Sign in';
    customRender(<AuthForm onSubmit={mockOnSubmit} buttonName={mockButtonName} />);
    customRender(<Button type="submit" text={mockButtonName} />);
    customRender(
      <InputText
        testid={'password-input'}
        id="password"
        register={mockOnSubmit}
        placeholder={t('enterPassword') as string}
        type="password"
        registerName={'password'}
      />
    );
    // customRender(<ValidationMessage testid={'alert1'} message={} />);
  });

  test('password input check', () => {
    const inputElement = screen.getByTestId('password-input');
    expect(inputElement).toBeInTheDocument();
    fireEvent.input(inputElement, {
      target: {
        value: '111',
      },
    });
    expect(inputElement).toHaveValue('111');
  });

  // test('button submit handler', async () => {
  //   const buttonElement = screen.getByTestId('submitBtn');
  //   expect(buttonElement).toBeInTheDocument();
  //   fireEvent.click(buttonElement);
  //   await waitFor(() => {
  //     const errorMessage = screen.getByTestId('alert1');
  //     expect(errorMessage).toHaveTextContent('password is a required field');
  //   });
  // });

  // test('validation on submit', async () => {
  //   const buttonElement = screen.getByTestId('submitBtn');
  //   const inputElement = screen.getByTestId('password-input');

  //   expect(inputElement).toBeInTheDocument();

  //   fireEvent.input(inputElement, {
  //     target: {
  //       value: '111',
  //     },
  //   });
  //   fireEvent.click(buttonElement);
  //   await waitFor(() => {
  //     const errorMessage = screen.getByTestId('alert1');
  //     expect(errorMessage).toHaveTextContent('password must be at least 8 characters');
  //   });
  // });
});
