import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../components/ui/**/*.stories.ts'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/angular',
    options: {
      compodoc: false,
    },
  },
};

export default config;
