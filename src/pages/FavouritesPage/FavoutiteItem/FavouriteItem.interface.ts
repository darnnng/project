import { IFavItem } from './../IFavouritesPage.interface';
export interface IFavouriteItemsProps {
  item: IFavItem;
  handleDeleteFromFavs: (userId: string, item: IFavItem) => void;
  userId: string;
  handleAddToCart: () => void;
}
