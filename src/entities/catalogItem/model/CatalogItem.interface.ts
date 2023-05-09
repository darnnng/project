export interface IListItem {
  id: string;
  image: string;
  name: string;
  price: string;
  attribute: string;
  isFavourite: boolean;
}

export interface ICatalogItemProps {
  item: IListItem;
  category: string;
}
