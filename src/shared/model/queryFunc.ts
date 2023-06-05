import { options } from '@shared/api/apiOptions';

export const handleQuery = async (url: string) => {
  const response = await fetch(url, options);
  return response.json();
};
