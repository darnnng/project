/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { options } from '@constants/apiOptions';

const ImageCards = () => {
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=4&pagesize=2&categories=ladies_all`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<any>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [isLoading, setIsLoading] = useState(true);

  //TO-DO TRANSLATE FROM API
  //TO-DO ADD NOTIFIER

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((result) => {
        setIsLoading(false);
        setItems(result);
      })
      .catch((err) => console.log(err));
  }, [url]);

  console.log(items);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemsList = items?.results?.map((elem: any) => {
    return { id: elem.code, name: elem.name, image: elem.allArticleBaseImages[0] };
  });
  return (
    <div>
      {itemsList?.map((category: any) => (
        <>
          <div key={category.id}>{category.name}</div>
          <img src={category.image} />
        </>
      ))}
    </div>
  );
};

export default ImageCards;
