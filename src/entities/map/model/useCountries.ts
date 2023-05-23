import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useHandleError } from '@shared/model/useHandleError';
import { options } from '@shared/api/apiOptions';
import { ICountry, ILocation } from './types';

export function useCountries() {
  const url = 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/regions/list';
  const handleError = useHandleError();

  const { isLoading, data } = useQuery({
    queryKey: ['countries', [url]],
    queryFn: () => fetch(url, options).then((res) => res.json()),
    onError: (error) => handleError(error as Error),
  });

  const countries = useMemo(
    () =>
      data
        ?.map((element: ILocation) => element.countries)
        .flatMap((countryArray: ICountry[]) =>
          countryArray.map((country: ICountry) => country.name)
        ),
    [data]
  );

  return {
    isLoading,
    countries,
  };
}
