import { StoryFn } from '@storybook/react';
import { Spinner } from './Spinner';

export default {
  title: 'Spinner',
  component: Spinner,
  argTypes: {
    color: {
      type: 'string',
      description: 'Color variant for spinner',
      defaultValue: 'default',
      options: ['default', 'black'],
      control: {
        type: 'radio',
      },
    },
  },
};

interface ITemplateProps {
  color: string;
}

const Template: StoryFn<ITemplateProps> = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: 'default',
};

export const BlackSpinner = Template.bind({});
BlackSpinner.args = {
  color: 'black',
};
