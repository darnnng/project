/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, ref, remove, set } from 'firebase/database';
import { db } from '@src/shared/api/firebase';

export const addToCartDb = async (userId: string, item: any) => {
  const cartObj = ref(db, `users/${userId}/cart/${item.id}`);
  const snapshot = await get(cartObj);
  const existingItem = snapshot.val();
  if (existingItem) {
    return;
  }
  await set(cartObj, item);
};

export const deleteFromCartDb = async (userId: string, item: any) => {
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

// export const getCartPrice = async (userId: string) => {
//   const cartObj = ref(db, `users/${userId}`);
//   const snapshot = await get(cartObj);
//   const cart = snapshot.val()?.cart || [];
//   let totalCost = 0;

//   for (const itemId in cart) {
//     const item = cart[itemId];
//     if (item.price) {
//       totalCost += parseFloat(item.price);
//     }
//   }

//   return totalCost.toFixed(2);
// };

//TO-DO чек по размеру?
export const checkIfIsInCart = async (userId: string, item: any) => {
  const cartObj = ref(db, `users/${userId}/cart/${item.id}`);
  const snapshot = await get(cartObj);
  return snapshot.exists();
};
