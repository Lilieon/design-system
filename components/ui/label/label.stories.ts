import type { Meta, StoryObj } from '@storybook/angular';
import { DsLabelComponent } from './label';

const meta: Meta<DsLabelComponent> = {
  title: 'UI/Label',
  component: DsLabelComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DsLabelComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <div class="flex w-64 flex-col gap-2">
        <ds-label for="demo">Email</ds-label>
        <input id="demo" dsInput placeholder="you@example.com" />
      </div>
    `,
  }),
};
