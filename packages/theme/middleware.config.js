module.exports = {
  integrations: {
    scgcommerce: {
      location: '@vue-storefront/scgcommerce-api/server',
      configuration: {
        api: {
          uri: 'https://www.bigthailand.com/api',
          timeout: 60 * 1000
        }
      }
    }
  }
};
