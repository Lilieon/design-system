import type { Meta, StoryObj } from '@storybook/angular';
import { DsButtonComponent } from '../button/button';
import {
  DsCardComponent,
  DsCardContentComponent,
  DsCardDescriptionComponent,
  DsCardFooterComponent,
  DsCardHeaderComponent,
  DsCardTitleComponent,
} from './card';

const meta: Meta<DsCardComponent> = {
  title: 'UI/Card',
  component: DsCardComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DsCardComponent>;

export const Default: Story = {
  render: () => ({
    imports: [
      DsCardComponent,
      DsCardHeaderComponent,
      DsCardTitleComponent,
      DsCardDescriptionComponent,
      DsCardContentComponent,
      DsCardFooterComponent,
      DsButtonComponent,
    ],
    template: `
      <ds-card class="w-sm">
        <ds-card-header>
          <ds-card-title>Create project</ds-card-title>
          <ds-card-description>Deploy your new project in one-click.</ds-card-description>
        </ds-card-header>
        <ds-card-content>
          <p class="text-sm text-muted-fg">Content goes here.</p>
        </ds-card-content>
        <ds-card-footer class="justify-end gap-2">
          <button dsButton variant="outline" size="sm">Cancel</button>
          <button dsButton size="sm">Deploy</button>
        </ds-card-footer>
      </ds-card>
    `,
  }),
};
