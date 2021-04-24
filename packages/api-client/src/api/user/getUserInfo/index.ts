import { Logger } from '@vue-storefront/core';

export default function getUserInfo({ client, config }, param) {
  const endpoint = '/authentication-service/user/userinfo?lang=en&userType=BUYER&orgIdfier=scg&auth=true';
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${param.accessToken}`
    }
  };

  Logger.info('GET', endpoint);
  return client.get(endpoint, axiosConfig);
}
