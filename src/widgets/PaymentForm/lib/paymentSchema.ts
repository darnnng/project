import { object, string } from 'yup';
import i18n from '@shared/lib/i18n/i18n';
import { getCardTypeFromNumber } from './handleCardType';

export const paymentSchema = object({
  cardNumber: string()
    .required('numberRequired')
    .min(16)
    .test('cardNumber', 'invalidCardNumber', (value) => {
      const cardType = getCardTypeFromNumber(value!);
      return cardType === 'Visa' || cardType === 'Mastercard' || cardType === 'American Express';
    }),
  cvc: string()
    .required('CVCrequired')
    .matches(/^\d{3,4}$/, 'invalidCVC'),
  cardName: string()
    .required('nameRequired')
    .matches(/^[A-Za-z\s]+$/, 'invalidCardholderName'),
  cardExpire: string()
    .required('expirationRequired')
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'invalidExpirationDate')
    .test('validExpiration', 'expirationWarning', function(value) {
      if (!value) return true;
      const [month, year] = value.split('/').map(Number);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      return year < currentYear || (year === currentYear && month < currentMonth) ? false : true;
    }),
});
