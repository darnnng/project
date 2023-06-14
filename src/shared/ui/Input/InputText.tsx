import cn from 'classnames';
import { Path } from 'react-hook-form';
import { IInputTextProps, IInputs } from './Input.interface';
import styles from './Input.module.scss';

export const InputText = <T extends IInputs>({
  register,
  size = 'medium',
  type = 'text',
  errors,
  testid,
  placeholder,
  id,
  registerName,
  onChange,
  maxlength,
  minlength,
}: IInputTextProps<T>) => {
  const style = errors ? styles.formErrorInput : styles.formInput;
  const inputCn = cn(style, styles[size]);
  return (
    <input
      id={id}
      className={inputCn}
      data-testid={testid}
      type={type}
      placeholder={placeholder}
      {...register!(registerName as Path<T>)}
      onChange={onChange}
      maxLength={maxlength}
      minLength={minlength}
    />
  );
};
