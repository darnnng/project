import { object, string } from 'yup';

export const orderSchema = object({
  city: string()
    .required()
    .min(2),
  street: string()
    .required()
    .min(2),
  house: string().required(),
});
