import styles from './ValidationMessage.module.scss';

export interface IValidationMessageProps {
  message: string;
}

export const ValidationMessage = ({ message }: IValidationMessageProps) => {
  return (
    <span role="alert" className={styles.errorMessage}>
      {message}
    </span>
  );
};
