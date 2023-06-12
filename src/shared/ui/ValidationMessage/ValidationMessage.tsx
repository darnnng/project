import styles from './ValidationMessage.module.scss';

export interface IValidationMessageProps {
  message: string;
  testid?: string;
}

export const ValidationMessage = ({ message, testid }: IValidationMessageProps) => {
  return (
    <span data-testid={testid} role="alert" className={styles.errorMessage}>
      {message}
    </span>
  );
};
