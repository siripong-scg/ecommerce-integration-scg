<template>
  <v-navigation-drawer v-model="drawerOpen" @input="onInput" absolute>
    <v-list>
      <v-list-item-group v-model="selectedItem" v-for="(item, i) in sidebar" :key="i" v-if="!item.submenu">
        <v-list-item :href="item.to">
          <v-list-item-content>
            <v-list-item-title v-text="item.title" link/>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-group v-else :value="false" class="ml-0">
        <template v-slot:activator>
          <v-list-item-title v-text="item.title"/>
        </template>

        <v-list-item-group>
          <v-list-item v-for="child in item.submenu" :key="child.title">
            <v-list-item-content class="pl-5">
              <v-list-item-title v-text="child.title"/>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: "NavigationMenu",
    props: {
      open: {
        type: Boolean,
        default: false
      },
      sidebar: Array,
      packages: Array,
    },
    data() {
      return {
        drawerOpen: this.open,
        selectedItem: 1,
      };
    },
    watch: {
      open(newVal) {
        this.drawerOpen = newVal;
      }
    },
    methods: {
      onInput(isOpen) {
        this.$emit("drawerOpened", isOpen);
      }
    }
  };
</script>

<style scoped>
  .v-navigation-drawer {
    z-index: 9999 !important;
  }
</style>
