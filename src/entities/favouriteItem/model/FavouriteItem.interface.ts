export interface IFavouriteItemsProps {
  item: IFavItem;
  handleDeleteFromFavs: (userId: string, item: IFavItem) => void;
  userId: string;
  handleAddToCart: () => void;
}

export interface IFavItem {
  id: string;
  picture: string;
  name: string;
  price: string;
  inStock: string;
}
