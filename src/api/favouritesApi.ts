/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, ref, remove, set } from 'firebase/database';
import { db } from '@src/firebase';

export const addToFavouritesDb = async (userId: string, item: any) => {
  const userRef = ref(db, `users/${userId}/favorites/${item.id}`);
  const snapshot = await get(userRef);
  const existingItem = snapshot.val();
  if (existingItem) {
    return;
  }
  await set(userRef, item);
};

export const deleteFromFavouritesDb = async (userId: string, item: any) => {
  const userRef = ref(db, `users/${userId}/favorites/${item.id}`);
  const snapshot = await get(userRef);
  const existingItem = snapshot.val();
  if (!existingItem) {
    return;
  }
  await remove(userRef);
};

export const getFavouritesDb = async (userId: string) => {
  const user = ref(db, `users/${userId}`);
  const snapshot = await get(user);
  return snapshot.val()?.favorites || [];
};

export const checkIsFavourite = async (userId: string, item: any) => {
  const user = ref(db, `users/${userId}/favorites/${item.id}`);
  const snapshot = await get(user);
  return snapshot.exists();
};
