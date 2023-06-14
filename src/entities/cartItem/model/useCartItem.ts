import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useHandleError } from '@shared/model/useHandleError';
import { handleQuery } from '@shared/model/queryFunc';
import { IArticle } from '@src/shared/model/interfaces/interfaces';

export function useCartItem(url: string, id: string, size: string) {
  const handleError = useHandleError();

  const { isLoading, data } = useQuery({
    queryKey: ['cartItemData', [url]],
    queryFn: () => handleQuery(url),
    onError: (error) => handleError(error as Error),
  });

  const article = useMemo(
    () => data?.product?.articlesList.find((element: IArticle) => element?.code === id),
    [data?.product?.articlesList, id]
  );

  const cartItem = useMemo(
    () => ({
      id: article?.code,
      picture: article?.galleryDetails[0]?.baseUrl,
      price: String(article?.whitePrice.price),
      name: article?.name,
      size: size,
    }),
    [article, size]
  );

  return {
    isLoading,
    data,
    cartItem,
  };
}
