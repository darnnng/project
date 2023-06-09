import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { ChangeEvent } from 'react';
import { IFormInput } from '@features/Authorization/model/types';
import { IOrderFormInput } from '@widgets/OrderForm/model/OrderForm.interface';
import { IPaymentInput } from '@src/widgets/PaymentForm/model/PaymentForm.interface';

export interface IInputTextProps<T extends FieldValues> {
  id: string;
  errors: unknown;
  size?: string;
  placeholder: string;
  type?: string;
  register?: UseFormRegister<T>;
  registerName?: Path<T>;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  maxlength?: number;
  minlength?: number;
}

export type IInputs = IFormInput | IOrderFormInput | IPaymentInput;
