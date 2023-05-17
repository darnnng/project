export interface ICartItem {
  id: string;
  picture: string;
  name: string;
  price: string;
  inStock: string;
  size: string;
}

export interface ICartListProps {
  cartItems: Record<string, ICartItem>;
  handleDeleteFromCart: (userId: string, item: ICartItem) => void;
}
