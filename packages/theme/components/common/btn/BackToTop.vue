<template>
  <v-btn
    v-scroll="onScroll"
    v-show="is_btn"
    fab
    fixed
    small
    bottom
    right
    icon
    @click="toTop"
    class="backToTopBtn"
  >
    <v-icon class="black--text" size="50px">mdi-arrow-up-circle-outline</v-icon>
  </v-btn>
</template>

<script>
  export default {
    data: () => ({
      is_btn: false
    }),

    methods: {
      onScroll(e) {
        if (typeof window === 'undefined') return
        const top = window.pageYOffset || e.target.scrollTop || 0
        this.is_btn = top > 700
      },
      toTop() {
        this.$vuetify.goTo(0)
      }
    }
  }
</script>

<style scoped>
  .backToTopBtn{
    bottom: 90px;
    right: 25px;
  }
</style>
