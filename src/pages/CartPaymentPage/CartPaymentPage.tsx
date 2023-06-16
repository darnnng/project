import { CartBreadcrumbs } from '@features/CartBreadcrumbs';
import { PaymentForm } from '@widgets/PaymentForm';
import { withPrivateRoute } from '@src/app/hocs/withPrivateRoute';
import styles from './CartPayment.module.scss';

const CartPaymentPage = () => {
  return (
    <div className={styles.pageContainer}>
      <CartBreadcrumbs />
      <PaymentForm />
    </div>
  );
};

export default withPrivateRoute(CartPaymentPage);
