import type { Meta, StoryObj } from '@storybook/angular';
import {
  DsAlertComponent,
  DsAlertDescriptionComponent,
  DsAlertTitleComponent,
} from './alert';

const meta: Meta<DsAlertComponent> = {
  title: 'UI/Alert',
  component: DsAlertComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'info', 'success', 'warning', 'destructive'],
    },
  },
};

export default meta;
type Story = StoryObj<DsAlertComponent>;

export const AllVariants: Story = {
  render: () => ({
    imports: [DsAlertComponent, DsAlertTitleComponent, DsAlertDescriptionComponent],
    template: `
      <div class="flex w-lg flex-col gap-4">
        <ds-alert>
          <ds-alert-title>Heads up!</ds-alert-title>
          <ds-alert-description>You can add components to your app.</ds-alert-description>
        </ds-alert>
        <ds-alert variant="info">
          <ds-alert-title>New version available</ds-alert-title>
          <ds-alert-description>Refresh to update to the latest release.</ds-alert-description>
        </ds-alert>
        <ds-alert variant="success">
          <ds-alert-title>Saved</ds-alert-title>
          <ds-alert-description>Your changes have been stored.</ds-alert-description>
        </ds-alert>
        <ds-alert variant="warning">
          <ds-alert-title>Storage almost full</ds-alert-title>
          <ds-alert-description>You are using 92% of your quota.</ds-alert-description>
        </ds-alert>
        <ds-alert variant="destructive">
          <ds-alert-title>Session expired</ds-alert-title>
          <ds-alert-description>Please sign in again to continue.</ds-alert-description>
        </ds-alert>
      </div>
    `,
  }),
};
