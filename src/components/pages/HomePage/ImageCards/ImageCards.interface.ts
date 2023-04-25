export interface ICardItemResults {
  code: string;
  name: string;
  galleryImages: {
    baseUrl: string;
  }[];
}

export interface IImageCard {
  id: string;
  name: string;
  image: string;
}
