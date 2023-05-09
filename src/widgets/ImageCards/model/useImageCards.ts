import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { options } from '@shared/api/apiOptions';
import { useHandleError } from '@shared/model/useHandleError';
import { ICardItemResults } from './ImageCards.interface';

export const useImageCards = (url: string) => {
  const handleError = useHandleError();

  const { data, isLoading } = useQuery({
    queryKey: 'cardsData',
    queryFn: () => fetch(url, options).then((res) => res.json()),
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
