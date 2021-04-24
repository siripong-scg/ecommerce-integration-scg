<template>
  <v-app light>
    <Header />
    <Nuxt />
    <Footer />
  </v-app>
</template>

<script>
import Header from '~/components/partials/Header';
import Footer from '~/components/partials/Footer';

export default {
  components: {
    Header,
    Footer
  }
};
</script>
