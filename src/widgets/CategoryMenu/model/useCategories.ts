import { useQuery } from 'react-query';
import { Urls } from '@shared/constants/urls';
import { useHandleError } from '@src/shared/model/useHandleError';
import { handleQuery } from '@shared/model/queryFunc';
import { ICategory } from './CategoryMenu.interface';

export function useCategoriesList() {
  const handleError = useHandleError();
  const url = Urls.CATEGORIES;

  const { data: catData, isLoading: categoriesLoading } = useQuery({
    queryKey: 'categoriesData',
    queryFn: () => handleQuery(url),
    onError: (error) => handleError(error as Error),
  });

  const categoriesList = catData?.map((elem: ICategory) => {
    return { name: elem.CatName, id: elem.tagCodes.join('') };
  });

  return { categoriesList, categoriesLoading };
}
