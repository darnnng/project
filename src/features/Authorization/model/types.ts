export interface IFormInput {
  email: string;
  password: string;
}

export interface IAuthFormProps {
  buttonName: string;
  onSubmit: (input: IFormInput) => void;
}
