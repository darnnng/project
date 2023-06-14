import { useEffect, useState } from 'react';
import { notifications } from '@shared/ui/Notifier/notifierSlice';
import { useAppSelector } from '@shared/model/reduxHooks';
import styles from './Notifier.module.scss';

export const Notifier = () => {
  const { alerts } = useAppSelector(notifications);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (alerts.length > 0) {
      setAlert(alerts[alerts.length - 1]);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [alerts]);

  return show ? (
    <div className={styles.wrapper}>
      <div className={alert.type === 'error' ? styles.error : styles.success}>
        {alert.message || ''}
      </div>
    </div>
  ) : null;
};
