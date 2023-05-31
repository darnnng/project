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
    text: {
      type: 'string',
      name: 'label',
      defaultValue: 'Add to cart',
    },
  },
};

interface TemplateProps {
  text: string;
  variant: string;
  size: string;
  disabled?: true;
}

const Template: StoryFn<TemplateProps> = (args) => <Button {...args} />;

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
