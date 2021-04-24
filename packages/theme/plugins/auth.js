export default function ({ $auth, $axios, $repositories, redirect }) {
  // $axios.onError(async (error) => {
  //   const code = parseInt(error.response && error.response.status);
  //   if (code === 403) {
  //     if (
  //       error.response.config.url.includes('api-gateway-service/auth/logout') ||
  //       error.response.config.url.includes('/authentication-service/user/userinfo',) ||
  //       error.response.config.url.includes(
  //         '/api-gateway-service/auth/guestlogin?lang=en&userType=buyer&orgIdfier=scg&b-uid=1.0.459',
  //       )
  //     ) {
  //       return;
  //     }
  //
  //     // if a guest user do guestLogin and reload
  //     if (!$auth.user || (!$auth.user.accessToken && !$auth.user.userId)) {
  //       await $repositories.user.guestLogin()
  //         .then((res) => {
  //           console.log(res);
  //           $auth.setToken('local', `Bearer ${res.accessToken}`);
  //           $axios.setHeader('Authorization', `Bearer ${res.accessToken}`);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //       return;
  //     }
  //
  //     $axios.setToken(false);
  //     $auth.logout();
  //   }
  //   return error;
  // });
}
