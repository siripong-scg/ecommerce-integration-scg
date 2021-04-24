/**
 * Repository plugin for using in .vue
 */

import createUserRepository from '~/api/user.js';

export default (ctx, inject) => {
  const userRepositoryWithAxios = createUserRepository(ctx.$axios);

  const repositories = {
    user: userRepositoryWithAxios('user'),
  };

  inject('repositories', repositories);
};
