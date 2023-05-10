import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useHandleError } from '@shared/model/useHandleError';
import { options } from '@shared/api/apiOptions';
import { IArticle, IGalleryImage, IVariantsList } from './types';

export function useSingleItem(url: string, id: string) {
  const handleError = useHandleError();

  const { isLoading, data } = useQuery({
    queryKey: ['singleItemData', [url]],
    queryFn: () => fetch(url, options).then((res) => res.json()),
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
    data,
    firebaseItem,
    galleryImages,
    sizes,
    articles,
  };
}
