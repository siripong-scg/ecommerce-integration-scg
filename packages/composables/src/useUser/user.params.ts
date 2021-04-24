import { Context, UseUserFactoryParams } from '@vue-storefront/core';
// import { Cart, Customer, LineItem, ProductVariant } from '../types/GraphQL';
import { authenticate } from './user.auth';
import { ICustomer } from './user.types';

type UserContext = any;

async function load(context: Context): Promise<ICustomer> {
  const isGuest = await context.$scgcommerce.api.isGuest();

  if (isGuest) {
    return null;
  }

  const profile = await context.$scgcommerce.api.getUserInfo({ customer: true });
  return profile.data.me.customer;
}

//
// const getCurrentUser = async (context: Context, currentUser) => {
//   if (!currentUser) {
//     return load(context);
//   }
//
//   return currentUser;
// };

export const params: UseUserFactoryParams<ICustomer, any, any> = {
  load,
  logOut: async (context: UserContext) => {
    await context.$scgcommerce.api.customerSignOut();
  },
  logIn: async (context: UserContext, params): Promise<ICustomer> => {
    console.log('this is ', { params });
    // const customerLogin = {
    //   email: username,
    //   password
    // };

    return authenticate(params, context.$scgcommerce.api.userLogin);
  },
  updateUser: () => null,
  register: () => null,
  changePassword: () => null
};
