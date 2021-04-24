import { Logger } from '@vue-storefront/core';
import { CustomerSignMeInDraft, CustomerSignMeUpDraft, ICustomer } from './user.types';

type UserData = CustomerSignMeUpDraft | CustomerSignMeInDraft;

export const authenticate = async (userData, fn): Promise<ICustomer> => {
  try {
    const userResponse = await fn(userData);
    return userResponse.data.user;
  } catch (err) {
    err.message = err?.graphQLErrors?.[0]?.message || err.message;
    Logger.error('useUser.authenticate', err.message);
    throw err?.response?.data?.graphQLErrors?.[0] || err;
  }
};
