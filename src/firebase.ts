import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAuNCx2BxRVqrbykmO4wwT2DlxlNgBSrVg',
  authDomain: 'shop-a3b84.firebaseapp.com',
  projectId: 'shop-a3b84',
  storageBucket: 'shop-a3b84.appspot.com',
  messagingSenderId: '998420913231',
  appId: '1:998420913231:web:82771ac3577727fc23de3a',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
