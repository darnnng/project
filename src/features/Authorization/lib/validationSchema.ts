import { object, string } from 'yup';

export const authSchema = object({
  email: string()
    .email('emailValid')
    .required('emailRequired'),
  password: string()
    .required('passwordRequired')
    .min(8),
});
