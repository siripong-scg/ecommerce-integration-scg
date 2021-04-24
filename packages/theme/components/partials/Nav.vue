<template>
  <div>
    <v-app-bar color="white" light prominent>
      <v-container v-show="$vuetify.breakpoint.smAndDown" class="lighten-5 padding-0 hidden-lg-and-up" fluid>
        <v-row no-gutters>
          <v-col :cols="3" class="col-nav-menu justify-left">
            <v-app-bar-nav-icon @click.stop="openLeftNavigationDrawer = !openLeftNavigationDrawer" />
            <v-app-bar-nav-icon>
              <v-icon>mdi-magnify</v-icon>
            </v-app-bar-nav-icon>
          </v-col>

          <v-col :cols="6" align="center" class="col-nav-menu justify-center">
            <NuxtLink class="nolinkstyle" to="/">
              <v-toolbar-title>
                <v-img :src="require(`~/assets/images/logo/Logo-Mitraruma.png`)" class="mr-3" max-width="50px" />
              </v-toolbar-title>
            </NuxtLink>
          </v-col>

          <v-col :cols="3" align="right" class="col-nav-menu justify-right">
            <v-app-bar-nav-icon>
              <v-icon>mdi-account-circle-outline</v-icon>
            </v-app-bar-nav-icon>
            <v-app-bar-nav-icon @click.stop="openRightNavigationDrawer = !openRightNavigationDrawer">
              <v-icon>mdi-cart</v-icon>
            </v-app-bar-nav-icon>
          </v-col>
        </v-row>
      </v-container>
      <v-container
        v-show="$vuetify.breakpoint.smAndUp"
        class="lighten-5 hidden-sm-and-down"
        fill-height
        fluid
        pa-0
        pl-4
        pr-4
      >
        <v-row no-gutters>
          <v-col :cols="1">
            <v-toolbar-title>
              <NuxtLink class="nolinkstyle" to="/">
                <v-img :src="require(`~/assets/images/logo/Logo-Mitraruma.png`)" class="mr-3" width="100px" />
              </NuxtLink>
            </v-toolbar-title>
            <v-spacer />
          </v-col>
          <v-col :cols="11" class="col-menu">
            <v-row class="pl-2 pb-2" no-gutters>
              <v-col :cols="5" align="left" class="header-search">
                <SearchBar :suggestionItems="searchSuggestion" :onSearchTyping="onSearchSuggestion" />
                <v-text-field
                  append-icon="mdi-magnify"
                  background-color="#f0f0f0"
                  clearable
                  hide-details
                  label="Search..."
                  rounded
                  solo
                />
              </v-col>
              <v-col :cols="7" align="right" class="col-menu">
                <span v-if="false">
                  <v-menu offset-y>
                    <template v-slot:activator="{ attrs, on }">
                      <v-btn v-bind="attrs" v-on="on" class="custom-selector font-bold" rounded text>
                        {{ $nuxt.$auth.user.fullName }}<v-icon class="pl-2">mdi-account-circle</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item link>
                        <v-list-item-title v-text="`My Profile`" />
                      </v-list-item>
                      <v-divider />
                      <v-list-item link>
                        <v-list-item-title @click="logout" v-text="`Log out`" />
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </span>
                <span v-else>
                  <v-btn color="firebrick" outlined rounded @click="$modal.show('SignInModal')">Sign In </v-btn>
                  <v-btn color="primary" depressed rounded @click="$modal.show('RegisterModal')">Register </v-btn>
                </span>
                <v-btn class="custom-selector font-bold" rounded text>
                  Cart <span class="font-bold">Rp0,00</span>
                  <v-badge v-show="true" color="red" content="1" overlap>
                    <v-icon class="pl-2">mdi-cart</v-icon>
                  </v-badge>
                </v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col :cols="12">
                <v-menu offset-y open-on-hover>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" class="pa-0 pl-2 pr-2" text>
                      Products
                      <v-icon class="primary--text">mdi-menu-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list width="200px">
                    <v-list-item v-for="(item, index) in sidebar[0].submenu" :key="index" :to="item.to" @click="">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-menu offset-y open-on-hover>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" class="pa-0 pl-2 pr-2" text>
                      Packages & Services
                      <v-icon class="primary--text">mdi-menu-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item v-for="(item, index) in sidebar[1].submenu" :key="index" :to="item.to" @click="">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-btn class="pa-1" text> Promo</v-btn>
                <v-btn class="pa-1" text> Blog</v-btn>
                <v-btn class="pa-1" text> Portfolio</v-btn>
                <v-btn :to="`/membership`" class="pa-1" text> Membership</v-btn>
                <v-btn class="pa-1" text> Online Consultation</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <RegisterModal />
    <SignInModal />
    <ForgotPasswordModal />
    <VerifyOtpModal />
    <SocialLoginModal />
    <ResetPasswordModal />
    <SuccessDialogModal />

    <BackToTopBtn />
    <ChatBtn />

    <NavCart
      v-if="openRightNavigationDrawer"
      :open="openRightNavigationDrawer"
      @drawerOpened="handleDrawerChange('right', $event)"
    />

    <NavMenu
      v-else
      :open="openLeftNavigationDrawer"
      v-bind:sidebar="sidebar"
      @drawerOpened="handleDrawerChange('left', $event)"
    />
  </div>
</template>

<script>
import NavMenu from './NavMenu';
import NavCart from './NavCart';
import SignInModal from '../common/modals/SignIn';
import RegisterModal from '../common/modals/Register';
import ForgotPasswordModal from '../common/modals/ForgotPassword';
import VerifyOtpModal from '../common/modals/VerifyOtp';
import SocialLoginModal from '../common/modals/SocialLogin';
import ResetPasswordModal from '../common/modals/ResetPassword';
import SuccessDialogModal from '../common/modals/SuccessDialog';
import BackToTopBtn from '../common/btn/BackToTop';
import ChatBtn from '../common/btn/Chat';
import SearchBar from '~/components/features/search/SearchBar';
import { useCategories, useSearchSuggestion } from '@vue-storefront/scgcommerce';
import { onMounted } from '@vue/composition-api';

export default {
  components: {
    SearchBar,
    NavMenu,
    NavCart,
    SignInModal,
    RegisterModal,
    ForgotPasswordModal,
    VerifyOtpModal,
    BackToTopBtn,
    ChatBtn,
    SocialLoginModal,
    ResetPasswordModal,
    SuccessDialogModal
  },
  setup() {
    const { getSearchSuggestion, searchSuggestion } = useSearchSuggestion();
    const { categories, search } = useCategories();

    onMounted(async () => {
      await search();
      // try {
      //   await logIn({ username: 'test', password: 'test'});
      // } catch (error) {
      //   console.log(error);
      // }
    });

    return {
      categories,
      searchSuggestion,
      getSearchSuggestion
    };
  },
  data() {
    return {
      openLeftNavigationDrawer: false,
      openRightNavigationDrawer: false,
      sidebar: [
        {
          title: 'PRODUCTS',
          submenu: [
            {
              text: 'Building material',
              title: 'Building material',
              to: '#',
              active: true,
              submenu: [
                {
                  title: 'CEMENT & CONCRETE',
                  sub: [
                    {
                      title: 'Light Brick',
                      to: '/'
                    },
                    {
                      title: 'Instant Concrete',
                      to: '/'
                    },
                    {
                      title: 'Normal Concrete',
                      to: '/'
                    },
                    {
                      title: 'Pipe and Precast',
                      to: '/'
                    },
                    {
                      title: 'Cement',
                      to: '/'
                    }
                  ]
                }
              ]
            },
            {
              text: 'Roof',
              title: 'Roof',
              to: '/services'
            },
            {
              text: 'Kitchen',
              title: 'Kitchen',
              to: '/services'
            },
            {
              text: 'Furniture',
              title: 'Furniture',
              to: '/services'
            },
            {
              text: 'Bathroom',
              title: 'Bathroom',
              to: '/services'
            },
            {
              text: 'Floor & Wall',
              title: 'Floor & Wall',
              to: '/services'
            },
            {
              text: 'Bedroom',
              title: 'Bedroom',
              to: '/services'
            },
            {
              text: 'Outdoor',
              title: 'Outdoor',
              to: '/services'
            }
          ]
        },
        {
          title: 'PACKAGES & SERVICES',
          submenu: [
            {
              text: 'Packages',
              title: 'Packages',
              to: '/packages'
            },
            {
              text: 'Services',
              title: 'Services',
              to: '/services'
            }
          ]
        },
        {
          title: 'PROMO',
          to: '/promo'
        },
        {
          title: 'BLOG',
          to: '/blog'
        },
        {
          title: 'INSPIRING LOOKS',
          to: '/inspiring-looks'
        },
        {
          title: 'MEMBERSHIP',
          to: '/membership'
        },
        {
          title: 'ONLINE CONSULTATION',
          to: '/online-consultation'
        }
      ]
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
    },
    handleDrawerChange(type, isOpen) {
      if (type === 'left') {
        this.openLeftNavigationDrawer = isOpen;
      } else {
        this.openRightNavigationDrawer = isOpen;
      }
    },
    async logout() {
      // this.$nuxt.$loading.start();
      // this.$store.commit('user/SET_BEFORE_LOGIN', '/');
      // $nuxt.$auth.logout();
      // $nuxt.$loading.finish();
      // this.$auth.redirect('/');
    }
  }
};
</script>

<style scoped>
.padding-0 {
  padding: 0px;
}

.col-nav-menu {
  align-self: center;
  display: inline-flex;
}

.nolinkstyle {
  color: #000;
  text-decoration: unset;
}

v-btn {
  font-size: 12px;
}
</style>
