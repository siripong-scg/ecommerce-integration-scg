<template>
  <div>
    <div v-for='category in categories'>
      <div>
        category {{ category.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { useCategories } from '@vue-storefront/scgcommerce';
import { ref, computed, onMounted } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'AppHeader',
  setup(props, { root }) {
    const {
      search,
      categories
    } = useCategories();
    // console.log({ search, categories });
    //
    onMounted(async () => {
      await search();
    });

    return {
      categories: computed(() => categories.value)
    };
  },
}
</script>

<style scoped>

</style>
