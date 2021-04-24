import { params } from './user.params';
import { useUserFactory } from '@vue-storefront/core';
import { ICustomer } from './user.types';

export default useUserFactory<ICustomer, any, any>(params);
