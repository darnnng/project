export interface ICartItem {
  id: string;
  picture: string;
  name: string;
  price: string;
  inStock: string;
  size: string;
}

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
