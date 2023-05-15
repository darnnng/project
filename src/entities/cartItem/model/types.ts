export interface IFabric {
  baseUrl: string;
}

export interface IVariantsList {
  size: {
    name: string;
  };
}

export interface IArticle {
  code: string;
  fabricSwatchThumbnails: IFabric[];
  variantsList: IVariantsList;
}

export interface ICartItem {
  id: string;
  picture: string;
  name: string;
  price: string;
  inStock: string;
  size: string;
}

export interface ICartItemProps {
  userId: string;
  handleDeleteFromCart: (userId: string, item: ICartItem) => void;
  item: ICartItem;
}
