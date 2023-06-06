import React from 'react';
import cn from 'classnames';
import { Path } from 'react-hook-form';
import { IInputTextProps, IInputs } from './Input.interface';
import styles from './Input.module.scss';

export const InputText = <T extends IInputs>({
  register,
  size = 'medium',
  type = 'text',
  errors,
  placeholder,
  id,
  registerName,
  onChange,
}: IInputTextProps<T>) => {
  const style = errors ? styles.formErrorInput : styles.formInput;
  const inputCn = cn(style, styles[size]);
  return (
    <input
      id={id}
      className={inputCn}
      type={type}
      placeholder={placeholder}
      {...register!(registerName as Path<T>)}
      onChange={onChange}
    />
  );
};
