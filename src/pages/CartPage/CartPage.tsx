import { CartBreadcrumbs } from '@features/CartBreadcrumbs';
import { CartList } from '@widgets/CartItemList';
import { OrderForm } from '@widgets/OrderForm';
import { useAppSelector } from '@src/shared/model/reduxHooks';
import { currentUser } from '@src/entities/user/model/userSlice';
import styles from './CartPage.module.scss';

const CartPage = () => {
  const { cartItems } = useAppSelector(currentUser);

  return (
    <div className={styles.pageContainer}>
      <CartBreadcrumbs />
      <div className={styles.orderContainer}>
        <CartList />
        {Object.keys(cartItems).length ? <OrderForm /> : ' '}
      </div>
    </div>
  );
};

export default CartPage;
