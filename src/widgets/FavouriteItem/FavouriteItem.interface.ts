import { IFavItem } from '../FavouriteList/IFavouritesList.interface';
export interface IFavouriteItemsProps {
  item: IFavItem;
  handleDeleteFromFavs: (userId: string, item: IFavItem) => void;
  userId: string;
  handleAddToCart: () => void;
}
