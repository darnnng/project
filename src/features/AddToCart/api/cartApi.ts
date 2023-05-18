import { get, ref, remove, set } from 'firebase/database';
import { db } from '@shared/api/firebase';
import { ICartItem } from '@entities/cartItem/model/types';

export const addToCartDb = async (userId: string, item: Partial<ICartItem>) => {
  const cartObj = ref(db, `users/${userId}/cart/${item.id}`);
  const snapshot = await get(cartObj);
  const existingItem = snapshot.val();
  if (existingItem) {
    return;
  }
  await set(cartObj, item);
};

export const deleteFromCartDb = async (userId: string, item: Partial<ICartItem>) => {
  const cartObj = ref(db, `users/${userId}/cart/${item.id}`);
  const snapshot = await get(cartObj);
  const existingItem = snapshot.val();
  if (!existingItem) {
    return;
  }
  await remove(cartObj);
};

export const getItemsFromCart = async (userId: string) => {
  const cartObj = ref(db, `users/${userId}`);
  const snapshot = await get(cartObj);
  return snapshot.val()?.cart || [];
};

export const checkIfIsInCart = async (userId: string, item: Partial<ICartItem>) => {
  const cartObj = ref(db, `users/${userId}/cart/${item.id}`);
  const snapshot = await get(cartObj);
  return snapshot.exists();
};
