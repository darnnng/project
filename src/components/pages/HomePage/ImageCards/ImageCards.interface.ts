export interface ICardItem {
  results: ICardItemResults[];
}

export interface ICardItemResults {
  code: string;
  name: string;
  galleryImages: {
    baseUrl: string;
  }[];
}
