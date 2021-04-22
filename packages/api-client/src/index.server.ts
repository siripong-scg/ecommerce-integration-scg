import { apiClientFactory } from '@vue-storefront/core';
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import getCategories from './api/getCategories';
import getSearchSuggestion from './api/getSearchSuggestion';
import axios from 'axios';

const defaultSettings = {};

const onCreate = (settings) => {
  console.log('initial api configuration', { settings });
  const { api } = settings;
  const client = axios.create({
    baseURL: api.uri,
    timeout: api.timeout,
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..wECNtLLcAdOvvHvX8NDlYw.wB7riHocQsLOSOwagbDyxNLt03NO6eT5_lR-S0KtqJJ4raCafAMaJlSlRe-dV7ZQ9xNmXmjiPfgKBAhbNgWQ_yqD_4FXW0S5P3nKrhMJgxyNK9cbw7Qdv9VtXqDthJpc5ousMkfpSBU-p_QFh_PAqQ.SNLJNN8ke-nay7l6rPs2jw'
    }
  });

  return {
    config: {
      ...defaultSettings,
      ...settings,
      lang: 'th'
    },
    client
  };
};

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api: {
    getProduct,
    getCategory,
    getCategories,
    getSearchSuggestion
  }
});

export { createApiClient };
