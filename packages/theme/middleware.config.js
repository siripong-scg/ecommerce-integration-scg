module.exports = {
  integrations: {
    scgcommerce: {
      location: '@vue-storefront/scgcommerce-api/server',
      configuration: {
        api: {
          uri: 'http://localhost:3000/api',
          timeout: 60 * 1000
        }
      }
    }
  }
};
