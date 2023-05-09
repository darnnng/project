import { useQuery } from 'react-query';
import { options } from '@src/shared/api/apiOptions';
import { useHandleError } from '@src/shared/model/useHandleError';
import { ICategory } from './CategoryMenu.interface';

export function useCategoriesList() {
  const handleError = useHandleError();
  const url =
    'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list?lang=en&country=us';

  const { data: catData } = useQuery({
    queryKey: 'categoriesData',
    queryFn: () => fetch(url, options).then((res) => res.json()),
    onError: (error) => handleError(error as Error),
  });

  const categoriesList = catData?.map((elem: ICategory) => {
    return { name: elem.CatName, id: elem.tagCodes.join('') };
  });

  return categoriesList;
}
