import { object, string } from 'yup';

export const paymentSchema = object({
  cardNumber: string()
    .required()
    .test('len', 'Must be exactly 16 characters', (val) => val!.length === 16),
  cvc: string()
    .required()
    .test('len', 'Must be exactly 3 characters', (val) => val!.length === 3),
  cardName: string()
    .required()
    .min(2),
  cardExpire: string().required(),
});

export interface IPaymentInput {
  cardNumber: string;
  cvc: number;
  cardName: number;
  cardExpire: Date;
}
