import { object, string } from 'yup';
import i18n from '@shared/lib/i18n/i18n';

export const authSchema = object({
  email: string()
    .email({ message: i18n.t('Email must be valid') })
    .required({ message: i18n.t('Email is required') }),
  password: string()
    .required({ message: i18n.t('Password is required') })
    .min(8),
});
