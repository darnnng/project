export interface IGalleryImage {
  baseUrl: string;
}

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
