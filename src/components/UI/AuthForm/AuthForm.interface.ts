import { IFormInput } from '@src/interfaces/IAuthFormInput';

export interface IAuthFormProps {
  buttonName: string;
  onSubmit: (input: IFormInput) => void;
}
