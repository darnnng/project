import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useQuery } from 'react-query';
import { customHookWrapper } from '@src/shared/lib/utils.tests';
import { useCartItem } from '../model/useCartItem';

jest.mock('react-query');

describe('UseCartItem test', () => {
  test('should return the correct cart item', () => {
    const mockData = {
      product: {
        articlesList: [
          {
            code: '1157799002',
            galleryDetails: [
              {
                baseUrl:
                  'https://image.hm.com/assets/hm/03/0f/030f5cc0f06ea374911fec14058c9a52249830ee.jpg',
              },
            ],
            whitePrice: { price: 12.99 },
            name: 'Ribbed Modal-blend T-shirt',
          },
        ],
      },
    };

    (useQuery as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: mockData,
    }));

    const url =
      'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?lang=en&country=us&productcode=1157799002';
    const id = '1157799002';
    const size = 'XL';

    const { result } = renderHook(() => useCartItem(url, id, size), { wrapper: customHookWrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(mockData);
    expect(result.current.cartItem).toEqual({
      id: '1157799002',
      picture: 'https://image.hm.com/assets/hm/03/0f/030f5cc0f06ea374911fec14058c9a52249830ee.jpg',
      price: '12.99',
      name: 'Ribbed Modal-blend T-shirt',
      size: 'XL',
    });
  });
});
