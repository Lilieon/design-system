import type { Preview } from '@storybook/angular';

// Global styles (Tailwind + design tokens) come from the Angular build target
// configured in angular.json (playground:build:development → src/styles.css).
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
  },
};

export default preview;
