export default function userLogin({ client, config }, params) {
  const endpoint = '/api-gateway-service/auth/login';
  console.log('userLogin', endpoint, params);

  return client.post(endpoint, params);
}
