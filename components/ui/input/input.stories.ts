import type { Meta, StoryObj } from '@storybook/angular';
import { DsInputComponent } from './input';

const meta: Meta<DsInputComponent> = {
  title: 'UI/Input',
  component: DsInputComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DsInputComponent>;

export const Default: Story = {
  render: () => ({
    template: `<input dsInput placeholder="you@example.com" class="w-64" />`,
  }),
};

export const Invalid: Story = {
  render: () => ({
    template: `<input dsInput value="not-an-email" aria-invalid="true" class="w-64" />`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `<input dsInput value="Locked" disabled class="w-64" />`,
  }),
};
