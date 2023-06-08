import { object, string } from 'yup';
import i18n from '@shared/lib/i18n/i18n';

export const orderSchema = object({
  city: string()
    .required('cityRequired')
    .matches(/^[A-Za-z\s]+$/, { message: i18n.t('onlyLetters') })
    .min(2),
  street: string()
    .required({ message: i18n.t('streetRequired') })
    .matches(/^[A-Za-z\s]+$/, { message: i18n.t('onlyLetters') })
    .min(2),
  house: string()
    .required({ message: i18n.t('houseRequired') })
    .matches(/^[0-9]+$/, { message: i18n.t('onlyNumbers') }),
});
