import { ref, push, set, serverTimestamp } from 'firebase/database';
import { db } from '@src/shared/api/firebase';
import { ICartItems } from '../model/PaymentForm.interface';

export const cleanCartDb = async (userId: string) => {
  const cartObj = ref(db, `users/${userId}/cart/`);
  await set(cartObj, null);
};

export const createOrderDb = async (userId: string, items: ICartItems) => {
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
