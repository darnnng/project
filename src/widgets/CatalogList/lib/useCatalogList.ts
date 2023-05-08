import { useQuery } from 'react-query';
import { useHandleError } from '@src/shared/lib/useError';
import { options } from '@src/shared/api/apiOptions';
import { ICatalogItemResults, IListItem } from '../model/CatalogList.interface';

export function useCatalogList(url: string, page: number, filter: string) {
  const handleError = useHandleError();

  const { isLoading, data } = useQuery({
    queryKey: ['catalogData', [url, page, filter]],
    queryFn: () => fetch(url, options).then((res) => res.json()),
    onError: (error) => {
      handleError(error as Error);
    },
  });

  const itemsList: IListItem[] = data?.results
    ? data?.results?.map((elem: ICatalogItemResults) => {
        return {
          id: elem.defaultArticle.code,
          name: elem.defaultArticle.name,
          image: elem.allArticleBaseImages ? elem.allArticleBaseImages[0] : elem.images[0].baseUrl,
          attribute: elem.sellingAttributes ? elem.sellingAttributes[0] : ' ',
          price: elem.price.formattedValue,
          isFavourite: false,
        };
      })
    : [];
  const totalNumberofItems = data?.pagination?.totalNumberOfResults;
  const pageCount = data?.pagination?.numberOfPages;

  return { isLoading, itemsList, totalNumberofItems, pageCount };
}
