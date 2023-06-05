import { StoryFn } from '@storybook/react';
import { Path, UseFormRegister, useForm } from 'react-hook-form';
import { InputText } from './InputText';
import { IInputs } from './Input.interface';

export default {
  title: 'Input',
  component: InputText,
  argTypes: {
    size: {
      type: 'string',
      description: 'Size variant for input',
      defaultValue: 'medium',
      options: ['small', 'medium'],
      control: {
        type: 'radio',
      },
    },
    type: {
      type: 'string',
      description: 'Type variant for input',
      defaultValue: 'medium',
      options: ['text', 'email', 'password'],
      control: {
        type: 'radio',
      },
    },
    registerName: {
      type: 'string',
      description: 'Register name variant for input',
      defaultValue: 'city',
      options: ['city', 'street', 'house', 'email', 'password'],
      control: {
        type: 'radio',
      },
    },
    text: {
      type: 'string',
      name: 'label',
      defaultValue: 'Enter city',
    },
  },
};

interface ITemplateProps {
  id: string;
  errors: boolean;
  placeholder: string;
  type: string;
  size: string;
  register: UseFormRegister<IInputs>;
  registerName?: Path<IInputs>;
}

const Template: StoryFn<ITemplateProps> = (args) => {
  const { register } = useForm<IInputs>();
  return <InputText {...args} register={register} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter city',
  errors: false,
  size: 'medium',
  type: 'text',
  registerName: 'city',
};

export const SmallInput = Template.bind({});
SmallInput.args = {
  placeholder: 'Enter street',
  errors: false,
  size: 'small',
  type: 'text',
  registerName: 'street',
};

export const EmailInput = Template.bind({});
EmailInput.args = {
  placeholder: 'Enter email',
  errors: false,
  size: 'medium',
  type: 'email',
  registerName: 'email',
};

export const PasswordErrorInput = Template.bind({});
PasswordErrorInput.args = {
  placeholder: 'Enter password',
  errors: true,
  size: 'medium',
  type: 'password',
  registerName: 'password',
};
