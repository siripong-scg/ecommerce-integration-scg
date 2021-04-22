// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getCategories({ client, config }, params) {
  // const payload = {
  //   lang: config.preferredLanguage || 'th',
  //   userType: config.userTypes[0] || 'BUYER',
  //   orgIdfier: config.orgIdfier || 'scg'
  // };

  // console.log({ payload });
  // console.log({ client });

  const endpoint = '/assets-dynamic/categories/all_en.json';
  const response = await client.get(endpoint);
  return response.data;
}
