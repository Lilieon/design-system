import type { Meta, StoryObj } from '@storybook/angular';
import { DsButtonComponent } from './button';

const meta: Meta<DsButtonComponent> = {
  title: 'UI/Button',
  component: DsButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg', 'icon'] },
  },
};

export default meta;
type Story = StoryObj<DsButtonComponent>;

export const Primary: Story = {
  render: (args) => ({
    props: args,
    template: `<button dsButton [variant]="variant" [size]="size">Button</button>`,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <button dsButton variant="primary">Primary</button>
        <button dsButton variant="secondary">Secondary</button>
        <button dsButton variant="outline">Outline</button>
        <button dsButton variant="ghost">Ghost</button>
        <button dsButton variant="destructive">Destructive</button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <button dsButton size="sm">Small</button>
        <button dsButton size="md">Medium</button>
        <button dsButton size="lg">Large</button>
      </div>
    `,
  }),
};
