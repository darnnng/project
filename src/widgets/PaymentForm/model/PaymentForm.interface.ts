import { ICartItem } from '@shared/model/interfaces/interfaces';

export interface IPaymentInput {
  cardNumber: string;
  cvc: number;
  cardName: number;
  cardExpire: Date;
}

export interface ICartItems {
  [id: string]: ICartItem;
}
