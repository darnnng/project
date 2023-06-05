import cn from 'classnames';
import styles from './Button.module.scss';
import { IButtonProps } from './Button.interface';

export const Button = ({
  onClick,
  variant = 'square',
  size = 'medium',
  text,
  disabled = false,
  type = 'button',
  styleProps,
}: IButtonProps) => {
  const mainCn = cn(styles.addButton, styles[size], styles[variant], styleProps);

  return (
    <button className={mainCn} onClick={onClick} disabled={disabled} type={type}>
      {text}
    </button>
  );
};
