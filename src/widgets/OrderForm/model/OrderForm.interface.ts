import { ICartItem } from '@entities/cartItem/model/types';

export interface IOrderFormInput {
  city: string;
  street: string;
  house: string;
}

export interface IOrderFormProps {
  cartItems: Record<string, ICartItem>;
}
