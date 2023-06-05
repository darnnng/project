import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useHandleError } from '@shared/model/useHandleError';
import { handleQuery } from '@shared/model/queryFunc';
import { ICardItemResults } from './ImageCards.interface';

export const useImageCards = () => {
  const handleError = useHandleError();
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=3&categories=ladies_all`;

  const { data, isLoading } = useQuery({
    queryKey: 'cardsData',
    queryFn: () => handleQuery(url),
    onError: (error) => handleError(error as Error),
  });

  const itemsList = useMemo(() => {
    return data?.results?.map((elem: ICardItemResults) => {
      return {
        id: elem.code,
        name: elem.name,
        image: elem.galleryImages[0].baseUrl,
        article: elem.defaultArticle.code,
      };
    });
  }, [data]);

  return { itemsList, isLoading };
};
