export interface IArticleElement {
  id: string;
  img: string;
}

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
