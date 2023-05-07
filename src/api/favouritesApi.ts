import { get, ref, remove, set } from 'firebase/database';
import { db } from '@src/shared/api/firebase';
import { IFavItem } from '@pages/FavouritesPage/IFavouritesPage.interface';

export const addToFavouritesDb = async (userId: string, item: IFavItem) => {
  const userObj = ref(db, `users/${userId}/favorites/${item.id}`);
  const snapshot = await get(userObj);
  const existingItem = snapshot.val();
  if (existingItem) {
    return;
  }
  await set(userObj, item);
};

export const deleteFromFavouritesDb = async (userId: string, item: IFavItem) => {
  const userObj = ref(db, `users/${userId}/favorites/${item.id}`);
  const snapshot = await get(userObj);
  const existingItem = snapshot.val();
  if (!existingItem) {
    return;
  }
  await remove(userObj);
};

export const getFavouritesDb = async (userId: string) => {
  const userObj = ref(db, `users/${userId}`);
  const snapshot = await get(userObj);
  return snapshot.val()?.favorites || [];
};

export const checkIsFavourite = async (userId: string, item: IFavItem) => {
  const userObj = ref(db, `users/${userId}/favorites/${item.id}`);
  const snapshot = await get(userObj);
  return snapshot.exists();
};
