<template>
  <div>
    <LazyHydrate when-visible>
      <AppHeader />
    </LazyHydrate>

    <div>
      <nuxt :key="$route.fullPath" />
    </div>

    <LazyHydrate when-visible>
      <AppFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import AppHeader from '~/layouts/AppHeader';
import AppFooter from '~/layouts/AppFooter';

export default {
  name: 'DefaultLayout',
  components: {
    AppFooter,
    LazyHydrate,
    AppHeader
  }
};
</script>

<style lang="scss"></style>
