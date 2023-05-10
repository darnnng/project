import { object, string } from 'yup';

export const authSchema = object({
  email: string()
    .email()
    .required(),
  password: string()
    .required()
    .min(8),
});
