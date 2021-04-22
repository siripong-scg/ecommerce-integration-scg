<template>
  <div id="search-bar" class="w-full max-w-lg">
    <form action='search'>
      <input
        class="rounded-3xl bg-lightSilver border border-solid border-lightGray py-1 px-4 focus:border-slateGray1 focus:bg-white w-full"
        type="text"
        placeholder="Search..."
        name='q'
        v-model="searchKeyword"
        @click='openSearchBox'
      />
    </form>
    <div v-if='searchKeyword && showSearchPopup'>
      <div v-for="item in suggestionItems">
        <div @click='hideSearchBox'>
          <nuxt-link :to='`/search?q=${item.name}`'>{{ item.name }}</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let delayInputFire;
export default {
  name: 'SearchBar',
  props: {
    suggestionItems: Array,
    onSearchTyping: Function
  },
  data() {
    return {
      searchKeyword: this.$route.query?.q,
      showSearchPopup: false
    };
  },
  watch: {
    searchKeyword(newValue, oldValue) {
      this.openSearchBox();
      clearTimeout(delayInputFire);
      delayInputFire = setTimeout(() => {
        if (newValue && newValue !== oldValue) {
          this.onSearchTyping?.(newValue);
        }
      }, 300);
    }
  },
  methods: {
    handleSearchSubmit(input) {
      const inputValue = input.target.value;
      this.onSearchSubmit?.(inputValue);
    },
    openSearchBox() {
      this.showSearchPopup = true;
    },
    hideSearchBox() {
      this.showSearchPopup = false;
    }
  }
};
</script>

<style></style>
