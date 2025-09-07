import { mergeConfig } from 'vite';

/** @type { import('@storybook/sveltekit').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|ts|svelte)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/sveltekit',
    options: {},
  },
  staticDirs: ['../static'],
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '$app/state': '/src/mocks/app-state.js',
          '$env/static/public': '/src/mocks/env-static-public.js',
        }
      },
    });
  },
};

export default config;
