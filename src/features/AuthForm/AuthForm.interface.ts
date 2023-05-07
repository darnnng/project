import { IFormInput } from '@src/features/AuthForm/IAuthFormInput';

export interface IAuthFormProps {
  buttonName: string;
  onSubmit: (input: IFormInput) => void;
}
