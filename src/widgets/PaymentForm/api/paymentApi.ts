/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, push, set, serverTimestamp } from 'firebase/database';
import { db } from '@src/shared/api/firebase';

export const cleanCartDb = async (userId: string) => {
  const cartObj = ref(db, `users/${userId}/cart/`);
  await set(cartObj, null);
};

export const createOrderDb = async (userId: string, items: any) => {
  const ordersRef = ref(db, `users/${userId}/orders`);
  const newOrderRef = push(ordersRef);
  const orderId = newOrderRef.key;

  await set(newOrderRef, {
    id: orderId,
    orderItems: items,
    timestamp: serverTimestamp(),
  });

  await cleanCartDb(userId);
};
