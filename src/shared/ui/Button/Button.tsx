import React from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';
import { IButtonProps } from './Button.interface';

export const Button = ({
  onClick,
  variant = 'square',
  size = 'medium',
  text,
  disabled = false,
}: IButtonProps) => {
  const mainCn = cn(styles.addButton, styles[size], styles[variant]);
  console.log(disabled);
  return (
    <button className={mainCn} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
