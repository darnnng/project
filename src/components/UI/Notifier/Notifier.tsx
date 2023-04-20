import React, { useEffect, useState } from 'react';
import { notifications } from '@src/redux/slices/notifierSlice';
import { useAppSelector } from '@src/hooks/reduxHooks';
import styles from './Notifier.module.scss';

export const Notifier = () => {
  const { alerts } = useAppSelector(notifications);
  const [alert, setAlert] = useState({ message: '' });
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
      <div>{alert.message || ''}</div>
    </div>
  ) : null;
};
