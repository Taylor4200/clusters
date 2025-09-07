export default {
  locales: ['en'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}',
      include: ['<rootDir>/src'],
      exclude: ['**/node_modules/**']
    }
  ],
  format: 'po'
};

