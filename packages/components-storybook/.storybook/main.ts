// https://github.com/storybookjs/storybook/issues/29567
import { main as base } from 'config-storybook';

export default {
  ...base,
  addons: [
    ...(base.addons || []),
    [
      '@storybook/addon-svelte-csf',
      {
        legacyTemplate: true
      }
    ]
  ]
};