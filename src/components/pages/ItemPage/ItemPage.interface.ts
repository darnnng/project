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
  code: string;
  size: ISize;
}

export interface IArticle {
  code: string;
  fabricSwatchThumbnails: IFabric[];
  variantsList: IVariantsList;
}
