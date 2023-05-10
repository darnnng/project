export interface ICardItemResults {
  code: string;
  name: string;
  galleryImages: {
    baseUrl: string;
  }[];
  defaultArticle: {
    code: string;
  };
}

export interface IImageCard {
  id: string;
  name: string;
  image: string;
  article: string;
}
