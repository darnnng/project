import { StoryFn } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    size: {
      type: 'string',
      description: 'Size variant for button',
      defaultValue: 'medium',
      options: ['small', 'medium', 'large'],
      control: {
        type: 'select',
      },
    },
    variant: {
      type: 'string',
      description: 'Shape variant for button',
      defaultValue: 'square',
      options: ['rounded', 'square'],
      control: {
        type: 'radio',
      },
    },
    text: {
      type: 'string',
      name: 'label',
      defaultValue: 'CART',
    },
  },
};

interface ITemplateProps {
  text: string;
  variant: string;
  size: string;
  disabled?: true;
}

const Template: StoryFn<ITemplateProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Add to cart',
  variant: 'square',
  size: 'medium',
};

export const DisabledBtn = Template.bind({});
DisabledBtn.args = {
  text: 'Already in your cart',
  variant: 'square',
  disabled: true,
  size: 'medium',
};

export const RoundedBtn = Template.bind({});
RoundedBtn.args = {
  text: 'Shop now',
  variant: 'rounded',
  size: 'small',
};
