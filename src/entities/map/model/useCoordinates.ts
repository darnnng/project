import { useState, useEffect, useCallback } from 'react';
import { useHandleError } from '@shared/model/useHandleError';
import { useCountries } from './useCountries';

export const useCoordinates = () => {
  const { countries } = useCountries();
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState<number[][]>([]);
  const handleError = useHandleError();

  const fetchCoordinates = useCallback(async () => {
    const apiKey = 'pk.8dff3177852d176d40af8ab6403cc69d'; //TO-DO MOVE API KEY AND REFACTOR COMPONENT
    const coordinates = [];

    for (let i = 0; i < countries.length; i++) {
      const country = countries[i];
      const geocodingUrl = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${country}&format=json`;
      try {
        const response = await fetch(geocodingUrl);
        const data = await response.json();

        if (data.length > 0) {
          const result = data[0];
          const { lat, lon } = result;
          coordinates.push([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        handleError(error as Error);
      }
    }
    setCoordinates(coordinates);
    setLoading(false);
  }, [countries, handleError]);

  useEffect(() => {
    if (countries?.length > 0) {
      fetchCoordinates();
    } else {
      setLoading(false);
    }
  }, [countries, fetchCoordinates]);

  return { loading, coordinates };
};
