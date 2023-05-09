export interface IGalleryImage {
  baseUrl: string;
}

export interface IFabric {
  baseUrl: string;
}
export interface ISize {
  name: string;
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
