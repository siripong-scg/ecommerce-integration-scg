import { vsfRef, generateContext } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { ISearchSuggestionParams } from '@vue-storefront/scgcommerce-api';

const useSearchSuggestion = () => {
  const searchSuggestion = vsfRef(null, 'scg-useSearchSuggestion');
  const context = generateContext('scg-useSearchSuggestion');

  const getSearchSuggestion = async (params: ISearchSuggestionParams) => {
    searchSuggestion.value = await context.$scgcommerce.api.getSearchSuggestion(params);
  };

  return {
    getSearchSuggestion,
    searchSuggestion: computed(() => searchSuggestion.value)
  };
};

export default useSearchSuggestion;
