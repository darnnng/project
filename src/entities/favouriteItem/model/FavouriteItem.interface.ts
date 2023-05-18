export interface IFavouriteItemsProps {
  item: IFavItem;
  handleDeleteFromFavs: (userId: string, item: IFavItem) => void;
  userId: string;
}

export interface IFavItem {
  id: string;
  picture: string;
  name: string;
  price: string;
  inStock: string;
}
