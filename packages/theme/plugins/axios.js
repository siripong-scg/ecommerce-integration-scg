export default function ({ $auth, $axios, $repositories, redirect }) {
  $axios.onError(error => {
    if (error.response && error.response.status === 500) {
      redirect('/')
    }
  })
  $axios.onResponse(async (response) => {
    const contentType = response.headers['content-type'];
    const statusCode = parseInt(response && response.status);

    const finalResponse = response;

    if (response.config.url.includes('/buyer-service/search')) {
      if (
        contentType &&
        !contentType.includes('application/json') &&
        statusCode == 200
      ) {
        /** what!, we expect JSON Object, this might be unauthorized */
        const guestToken = await $repositories.user.guestLogin();

        /** Guest token, please */
        await $auth.setToken('local', `Bearer ${guestToken.accessToken}`);

        /** Try to search again */
        try {
          finalResponse.data = await $repositories.product.search(
            JSON.parse(response.config.data),
            `Bearer ${guestToken.accessToken}`,
          );
        } catch (error) {
          console.log(error);
        }
      }
    }
    return finalResponse;
  });
}
