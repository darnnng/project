import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useHandleError } from '@src/shared/lib/useError';

interface IArticle {
  code: string;
  name: string;
  galleryDetails: Array<{ baseUrl: string }>;
  fabricSwatchThumbnails: Array<{ baseUrl: string }>;
  whitePrice: { price: number };
  variantsList: Array<{ size: { name: string } }>;
}

interface IGalleryImage {
  baseUrl: string;
}

interface IVariantsList {
  size: {
    name: string;
  };
}

interface ICatalogItemResults {
  defaultArticle: {
    code: string;
    name: string;
  };
  allArticleBaseImages: string[];
  images: Array<{ baseUrl: string }>;
  sellingAttributes: string[];
  price: {
    formattedValue: string;
  };
}

interface ICatalogData {
  results: Array<ICatalogItemResults>;
  pagination: {
    totalNumberOfResults: number;
    numberOfPages: number;
  };
}

interface ISingleItemData {
  product: {
    inStock: boolean;
    articlesList: Array<IArticle>;
  };
}

export function useFetchSingleItem(url: string, id: string) {
  const handleError = useHandleError();

  const { isLoading, data } = useQuery<ISingleItemData>({
    queryKey: ['singleItemData', [url]],
    queryFn: () => fetch(url).then((res) => res.json()),
    onError: (error) => handleError(error as Error),
  });

  const article = useMemo(
    () => data?.product?.articlesList.find((element: IArticle) => element?.code === id),
    [data?.product?.articlesList, id]
  );

  const firebaseItem = useMemo(
    () => ({
      id: article?.code,
      picture: article?.galleryDetails[0]?.baseUrl,
      price: String(article?.whitePrice.price),
      name: article?.name,
      inStock: String(data?.product?.inStock),
    }),
    [article, data?.product?.inStock]
  );

  const galleryImages = useMemo(
    () => article?.galleryDetails?.map((elem: IGalleryImage) => elem.baseUrl),
    [article?.galleryDetails]
  );

  const sizes = useMemo(
    () => article?.variantsList?.map((elem: IVariantsList) => elem?.size?.name) || [],
    [article?.variantsList]
  );

  const articles = useMemo(
    () =>
      data?.product?.articlesList.map((elem: IArticle) => ({
        id: elem?.code,
        img: elem.fabricSwatchThumbnails[0]?.baseUrl,
      })),
    [data?.product?.articlesList]
  );

  return {
    isLoading,
    firebaseItem,
    galleryImages,
    sizes,
    articles,
  };
}
