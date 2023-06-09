export interface IPaymentInput {
  cardNumber: string;
  cvc: number;
  cardName: number;
  cardExpire: Date;
}

export interface ICartItem {
  id: string;
  name: string;
  picture: string;
  price: string;
  size: string;
}

export interface ICartItems {
  [id: string]: ICartItem;
}
