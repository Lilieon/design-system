import type { Meta, StoryObj } from '@storybook/angular';
import { DsBadgeComponent } from './badge';

const meta: Meta<DsBadgeComponent> = {
  title: 'UI/Badge',
  component: DsBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'secondary', 'destructive', 'success', 'warning', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<DsBadgeComponent>;

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <ds-badge>Default</ds-badge>
        <ds-badge variant="secondary">Secondary</ds-badge>
        <ds-badge variant="destructive">Destructive</ds-badge>
        <ds-badge variant="success">Success</ds-badge>
        <ds-badge variant="warning">Warning</ds-badge>
        <ds-badge variant="outline">Outline</ds-badge>
      </div>
    `,
  }),
};
