import { ICartItem } from '@shared/model/interfaces/interfaces';

export interface IUserState {
  email: string | null;
  userId: string | null;
  cartItems: Record<string, ICartItem> | Record<string, never>;
  address: {
    city: string;
    street: string;
    house: string;
  };
}
