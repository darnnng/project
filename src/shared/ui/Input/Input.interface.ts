import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { IFormInput } from '@features/Authorization/model/types';
import { IOrderFormInput } from '@widgets/OrderForm/model/OrderForm.interface';

export interface IInputTextProps<T extends FieldValues> {
  id: string;
  errors: unknown;
  size?: string;
  placeholder: string;
  type?: string;
  register?: UseFormRegister<T>;
  registerName?: Path<T>;
}

export type IInputs = IFormInput | IOrderFormInput;
