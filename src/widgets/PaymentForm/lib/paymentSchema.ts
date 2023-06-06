import { object, string } from 'yup';
import { getCardTypeFromNumber } from './handleCardType';

export const paymentSchema = object({
  cardNumber: string().test('cardNumber', 'Invalid card number', (value) => {
    const cardType = getCardTypeFromNumber(value!);
    return cardType === 'Visa' || cardType === 'Mastercard' || cardType === 'American Express';
  }),
  cvc: string()
    .required('CVC is required')
    .matches(/^\d{3,4}$/, 'Invalid CVC'),
  cardName: string()
    .required()
    .matches(/^[A-Za-z\s]+$/, 'Invalid cardholder name'),
  cardExpire: string()
    .required()
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Invalid expiration date')
    .test('validExpiration', 'Expiration date must be bigger than current', function(value) {
      if (!value) return true;
      const [month, year] = value.split('/').map(Number);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      return year < currentYear || (year === currentYear && month < currentMonth) ? false : true;
    }),
});

export interface IPaymentInput {
  cardNumber: string;
  cvc: number;
  cardName: number;
  cardExpire: Date;
}
