const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    video: false,
    env: {
      apiUrl: 'https://fakestoreapi.com',
      sauceUser: 'standard_user',
    },
  },
});
