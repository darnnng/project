import { object, string } from 'yup';
import i18n from '@shared/lib/i18n/i18n';
import { getCardTypeFromNumber } from './handleCardType';

export const paymentSchema = object({
  cardNumber: string()
    .required({ message: i18n.t('Number is required') })
    .min(16)
    .test('cardNumber', { message: i18n.t('Invalid card number') }, (value) => {
      const cardType = getCardTypeFromNumber(value!);
      return cardType === 'Visa' || cardType === 'Mastercard' || cardType === 'American Express';
    }),
  cvc: string()
    .required({ message: i18n.t('CVC is required') })
    .matches(/^\d{3,4}$/, { message: i18n.t('Invalid CVC') }),
  cardName: string()
    .required({ message: i18n.t('Name is required') })
    .matches(/^[A-Za-z\s]+$/, { message: i18n.t('Invalid cardholder name') }),
  cardExpire: string()
    .required({ message: i18n.t('Expiring date is required') })
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, {
      message: i18n.t('Invalid expiration date'),
    })
    .test(
      'validExpiration',
      { message: i18n.t('Expiration date must be bigger than current') },
      function(value) {
        if (!value) return true;
        const [month, year] = value.split('/').map(Number);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        return year < currentYear || (year === currentYear && month < currentMonth) ? false : true;
      }
    ),
});
