import { vsfRef, generateContext } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';

const useCategories = () => {
  const categories = vsfRef(null, 'scg-useCategories');
  const context = generateContext('scg-useCategories');

  const search = async () => {
    categories.value = await context.$scgcommerce.api.getCategories();
  };

  return {
    search,
    categories: computed(() => categories.value)
  };
};

export default useCategories;
