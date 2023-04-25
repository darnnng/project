export interface ICatalogItem {
  results: ICatalogItemResults[];
  pagination: {
    totalNumberOfResults: number;
    numberOfPages: number;
  };
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
