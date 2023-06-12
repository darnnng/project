import { ICartItem } from '@shared/model/interfaces/interfaces';

export interface ICartItemProps {
  userId: string;
  handleDeleteFromCart: (userId: string, item: ICartItem) => void;
  item: ICartItem;
}
