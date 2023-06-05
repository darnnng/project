import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useHandleError } from '@shared/model/useHandleError';
import { handleQuery } from '@src/shared/model/queryFunc';
import { Urls } from '@shared/constants/urls';
import { ICountry, ILocation } from './types';

export function useCountries() {
  const url = Urls.REGIONS;
  const handleError = useHandleError();

  const { isLoading, data } = useQuery({
    queryKey: ['countries', [url]],
    queryFn: () => handleQuery(url),
    onError: (error) => handleError(error as Error),
  });

  const countries = useMemo(
    () =>
      data
        .map((element: ILocation) => element.countries)
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
