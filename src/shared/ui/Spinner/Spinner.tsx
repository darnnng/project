import cn from 'classnames';
import styles from './Spinner.module.scss';
import { ISpinnerProps } from './Spinner.interface';

export const Spinner = ({ color = 'default' }: ISpinnerProps) => {
  const mainCn = cn(styles.loadingSpinner, styles[color]);
  return (
    <div className={styles.spinnerContainer}>
      <div className={mainCn}></div>
    </div>
  );
};
