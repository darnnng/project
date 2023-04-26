interface IDefaultArticle {
  code: string;
  name: string;
}

export interface ICatalogItemResults {
  defaultArticle: IDefaultArticle;
  allArticleBaseImages?: string[];
  images: {
    baseUrl: string;
  }[];
  sellingAttributes?: string[];
  price: {
    formattedValue: string;
  };
}

export interface IListItem {
  id: string;
  image: string;
  name: string;
  price: string;
  attribute: string;
  isFavourite: boolean;
}
