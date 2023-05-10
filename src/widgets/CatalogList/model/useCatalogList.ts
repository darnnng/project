import { useQuery } from 'react-query';
import { useMemo } from 'react';
import { useHandleError } from '@src/shared/model/useHandleError';
import { options } from '@src/shared/api/apiOptions';
import { ICatalogItemResults, IListItem } from './CatalogList.interface';

export function useCatalogList(url: string, page: number, filter: string) {
  const handleError = useHandleError();

  const { isLoading, data } = useQuery({
    queryKey: ['catalogData', [url, page, filter]],
    queryFn: () => fetch(url, options).then((res) => res.json()),
    onError: (error) => {
      handleError(error as Error);
    },
  });

  const itemsList: IListItem[] = useMemo(() => {
    return (
      data?.results?.map((elem: ICatalogItemResults) => {
        return {
          id: elem.defaultArticle.code,
          name: elem.defaultArticle.name,
          image: elem.allArticleBaseImages ? elem.allArticleBaseImages[0] : elem.images[0].baseUrl, //TO-DO USE ANOTHER PROPERTY ('CAUSE IMAGES REPEAT)
          attribute: elem.sellingAttributes ? elem.sellingAttributes[0] : ' ',
          price: elem.price.formattedValue,
          isFavourite: false,
        };
      }) || []
    );
  }, [data]);

  const totalNumberOfItems = useMemo(() => data?.pagination?.totalNumberOfResults || 0, [data]);
  const pageCount = useMemo(() => data?.pagination?.numberOfPages || 0, [data]);

  return { isLoading, itemsList, totalNumberOfItems, pageCount };
}
