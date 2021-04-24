<template>
  <div>
    <div class="container shadow-sm px-4 flex justify-between">
      <div class="w-32">
        <nuxt-link to="/">Logo</nuxt-link>
      </div>
      <div class="w-auto flex flex-col">
        <div class="flex justify-between">
          <div class="flex flex-none">
            <SearchBar :suggestionItems="searchSuggestion" :onSearchTyping="onSearchSuggestion" />
          </div>
          <div class="inline-flex">
            <!-- user bar slot -->
            <CustomerBar :onLoginClick="toggleLoginModal" :onRegisterClick="toggleRegisterModal" />
            <div class="ml-4 mt-2">
              <!-- cart slot -->
              <MiniCart />
            </div>
          </div>
        </div>
        <div>
          <nuxt-link to="/test">Test</nuxt-link>
          <!-- mega menu slot -->
          <!-- <div v-for="category in categories">
      <div>category {{ category.name }}</div>
    </div> -->
        </div>
      </div>
    </div>

    <LoginModal :onCloseClick="toggleLoginModal" :show="isLoginModalOpen" />
    <RegisterModal :onCloseClick="toggleRegisterModal" :show="isRegisterModalOpen" />
  </div>
</template>

<script>
import { useCategories, categoryGetters, useSearchSuggestion } from '@vue-storefront/scgcommerce';
import { computed, onMounted } from '@vue/composition-api';
import MiniCart from '~/components/features/cart/MiniCart';
import SearchBar from '~/components/features/search/SearchBar';
import CustomerBar from '~/components/features/user/CustomerBar';
import LoginModal from '~/components/features/user/LoginModal';
import RegisterModal from '~/components/features/user/RegisterModal';
import useUiState from '~/contexts/useUiState';
import { onSSR } from '@vue-storefront/core';
// import { onSSR } from '@vue-storefront/core';

export default {
  name: 'AppHeader',
  components: {
    MiniCart,
    SearchBar,
    CustomerBar,
    LoginModal,
    RegisterModal
  },
  setup() {
    const { search, categories } = useCategories();
    const categoryItems = computed(() => categoryGetters.getCategoryItems(categories.value));
    const { getSearchSuggestion, searchSuggestion } = useSearchSuggestion();
    const { isLoginModalOpen, toggleLoginModal, isRegisterModalOpen, toggleRegisterModal } = useUiState();
    // console.log({ search, categories });

    onMounted(async () => {
      try {
        await search();
        await search();
      } catch (error) {
        console.log(error);
      }
    });

    return {
      categories: categoryItems,
      isLoginModalOpen,
      toggleLoginModal,
      isRegisterModalOpen,
      toggleRegisterModal,
      searchSuggestion,
      getSearchSuggestion
    };
  },
  methods: {
    onSearchSuggestion(keyword) {
      const searchParams = {
        lang: 'th',
        userTypes: 'BUYER',
        orgIdfier: 'scg',
        keyword: keyword,
        limit: 15,
        page: 1
      };
      this.getSearchSuggestion(searchParams);
    }
  }
};
</script>

<style scoped></style>
