
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ISearchSuggestion, ISearchSuggestionParams } from '../../types';

export default async function getSearchSuggestion(
  { client, config },
  params: ISearchSuggestionParams
): Promise<ISearchSuggestion[]> {
  const payload = {
    lang: config.lang || 'th',
    userType: params.userTypes || 'BUYER',
    orgIdfier: params.orgIdfier || 'scg',
    q: {
      term: params.keyword
    },
    limit: params.limit,
    page: params.page,
    transformData: true
  };

  const endpoint = '/buyer-service/comp-suggest';
  const response = await client.post(endpoint, payload);
  return response.data;
}
