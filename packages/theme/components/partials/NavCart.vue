<template>
  <v-navigation-drawer v-model="drawerOpen" @input="onInput" absolute right
  >
    <v-list-item>
      <v-list-item-content>
        <span class="title font-bold text-lg text-gray-400">
          Shopping Cart
        </span>
      </v-list-item-content>
    </v-list-item>

    <v-divider/>

    <v-list prominent nav>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>
            No products in the cart.
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'NavigationCart',
    props: {
      open: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        drawerOpen: this.open
      }
    },
    watch: {
      open(newVal) {
        this.drawerOpen = newVal
      }
    },
    methods: {
      onInput(isOpen) {
        this.$emit('drawerOpened', isOpen)
      }
    }
  }
</script>


<style scoped>
  .v-navigation-drawer {
    z-index: 999 !important;
  }
</style>
