import { CustomQuery } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getCategories(context, params, customQuery?: CustomQuery) {
  const payload = {
    lang: user.preferredLanguage || 'th',
    userType: user.userTypes[0] || 'BUYER',
    orgIdfier: user.orgIdfier || 'scg',
  };

  const endpoint = `/assets-dynamic/categories/all_${payload.lang}.json`;
  console.log('GET', endpoint, payload);
  return $axios.$get(endpoint, {
    params: payload,
  });
}
