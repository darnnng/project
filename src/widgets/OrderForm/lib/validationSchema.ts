import { object, string } from 'yup';
import i18n from '@shared/lib/i18n/i18n';

export const orderSchema = object({
  city: string()
    .required({ message: i18n.t('City is required') })
    .matches(/^[A-Za-z\s]+$/, { message: i18n.t('Only letters') })
    .min(2),
  street: string()
    .required({ message: i18n.t('Street is required') })
    .matches(/^[A-Za-z\s]+$/, { message: i18n.t('Only letters') })
    .min(2),
  house: string()
    .required({ message: i18n.t('House is required') })
    .matches(/^[0-9]+$/, { message: i18n.t('Only numbers') }),
});
