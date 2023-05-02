import { get, ref, set } from 'firebase/database';
import { db } from '@src/firebase';

export const addToFavouritesDb = async (userId: string, itemId: number) => {
  const user = ref(db, `users/${userId}`);

  const snapshot = await get(user);
  const favorites = snapshot.val()?.favorites || [];
  if (favorites.includes(itemId)) {
    return;
  }
  const updatedFavorites = [...favorites, itemId];
  await set(user, {
    favorites: updatedFavorites,
  });
};

export const deleteFromFavouritesDb = async (userId: string, itemId: number) => {
  const user = ref(db, `users/${userId}`);
  const snapshot = await get(user);
  const favorites = snapshot.val()?.favorites || [];
  const itemIndex = favorites.indexOf(itemId);
  if (itemIndex === -1) {
    return;
  }
  favorites.splice(itemIndex, 1);
  await set(user, {
    favorites: favorites,
  });
};

export const getFavouritesDb = async (userId: string) => {
  const user = ref(db, `users/${userId}`);
  const snapshot = await get(user);
  return snapshot.val()?.favorites || [];
};

export const checkIsFavourite = async (userId: string, itemId: number) => {
  const user = ref(db, `users/${userId}`);
  const snapshot = await get(user);
  const favourites = snapshot.val()?.favorites || [];
  return favourites.indexOf(itemId) !== -1;
};
