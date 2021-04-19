import { apiClientFactory } from '@vue-storefront/core';
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import getCategories from './api/getCategories';

const defaultSettings = {};

const onCreate = (settings) => {
  console.log({ settings });
  return {
    config: {
      ...defaultSettings,
      ...settings
    },
    client: {}
  };
};

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api: {
    getProduct,
    getCategory,
    getCategories
  }
});

export {
  createApiClient
};
