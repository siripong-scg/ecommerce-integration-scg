<template>
  <div>
    <v-app-bar light color="white" prominent>
      <v-container v-show="$vuetify.breakpoint.smAndDown" class="lighten-5 padding-0 hidden-lg-and-up" fluid>
        <v-row no-gutters>
          <v-col :cols="3" class="col-nav-menu justify-left">
            <v-app-bar-nav-icon @click.stop="openLeftNavigationDrawer=!openLeftNavigationDrawer"/>
            <v-app-bar-nav-icon>
              <v-icon>mdi-magnify</v-icon>
            </v-app-bar-nav-icon>
          </v-col>

          <v-col :cols="6" align="center" class="col-nav-menu justify-center">
            <NuxtLink class="nolinkstyle" to="/">
              <v-toolbar-title>
                <v-img class="mr-3" :src="require(`~/assets/images/logo/Logo-Mitraruma.png`)"
                       max-width="50px"/>
              </v-toolbar-title>
            </NuxtLink>
          </v-col>

          <v-col :cols="3" class="col-nav-menu justify-right" align="right">
            <v-app-bar-nav-icon>
              <v-icon>mdi-account-circle-outline</v-icon>
            </v-app-bar-nav-icon>
            <v-app-bar-nav-icon @click.stop="openRightNavigationDrawer=!openRightNavigationDrawer">
              <v-icon>mdi-cart</v-icon>
            </v-app-bar-nav-icon>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-show="$vuetify.breakpoint.smAndUp" class="lighten-5 hidden-sm-and-down" fluid pa-0 pl-4 pr-4 fill-height>
        <v-row no-gutters>
          <v-col :cols="1">
            <v-toolbar-title>
              <NuxtLink class="nolinkstyle" to="/">
                <v-img class="mr-3" :src="require(`~/assets/images/logo/Logo-Mitraruma.png`)"
                       width="100px"/>
              </NuxtLink>
            </v-toolbar-title>
            <v-spacer/>
          </v-col>
          <v-col :cols="11" class="col-menu">
            <v-row no-gutters class="pl-2 pb-2">
              <v-col :cols="5" align="left" class="header-search">
                <v-text-field
                  solo
                  label="Search..."
                  clearable
                  append-icon="mdi-magnify"
                  rounded
                  hide-details
                  background-color="#f0f0f0"
                />
              </v-col>
              <v-col :cols="7" align="right" class="col-menu">
                  <span v-if="$nuxt.$auth.loggedIn">
                    <v-menu offset-y>
                      <template v-slot:activator="{ attrs, on }">
                        <v-btn
                          text
                          rounded
                          class="custom-selector font-bold"
                          v-bind="attrs"
                          v-on="on"
                        >
                          {{$nuxt.$auth.user.fullName}}<v-icon
                          class="pl-2">mdi-account-circle</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item link>
                          <v-list-item-title v-text="`My Profile`"/>
                        </v-list-item>
                        <v-divider/>
                        <v-list-item link>
                          <v-list-item-title @click="logout" v-text="`Log out`"/>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </span>
                <span v-else>
                    <v-btn
                      rounded
                      outlined
                      color="firebrick"
                      @click="$modal.show('SignInModal')"
                    >Sign In
                    </v-btn>
                    <v-btn
                      rounded
                      depressed
                      color="primary"
                      @click="$modal.show('RegisterModal')"
                    >Register
                    </v-btn>
                  </span>
                <v-btn class="custom-selector font-bold" rounded text>
                  Cart <span class="font-bold">Rp0,00</span>
                  <v-badge
                    color="red"
                    overlap
                    content="1"
                    v-show="true"
                  >
                    <v-icon class="pl-2">mdi-cart</v-icon>
                  </v-badge>
                </v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col :cols="12">
                <v-menu
                  open-on-hover
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      text class="pa-0 pl-2 pr-2"
                    >
                      Products
                      <v-icon class="primary--text">mdi-menu-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list width="200px">
                    <v-list-item
                      v-for="(item, index) in sidebar[0].submenu"
                      :key="index"
                      @click=""
                      :to="item.to"
                    >
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-menu
                  open-on-hover
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      text class="pa-0 pl-2 pr-2"
                    >
                      Packages & Services
                      <v-icon class="primary--text">mdi-menu-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in sidebar[1].submenu"
                      :key="index"
                      @click=""
                      :to="item.to"
                    >
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-btn text class="pa-1">
                  Promo
                </v-btn>
                <v-btn text class="pa-1">
                  Blog
                </v-btn>
                <v-btn text class="pa-1">
                  Portfolio
                </v-btn>
                <v-btn text class="pa-1" :to="`/membership`">
                  Membership
                </v-btn>
                <v-btn text class="pa-1">
                  Online Consultation
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <RegisterModal/>
    <SignInModal/>
    <ForgotPasswordModal/>
    <VerifyOtpModal/>
    <SocialLoginModal/>
    <ResetPasswordModal/>
    <SuccessDialogModal/>

    <BackToTopBtn/>
    <ChatBtn/>

    <NavCart v-if="openRightNavigationDrawer"
             :open="openRightNavigationDrawer"
             @drawerOpened="handleDrawerChange('right', $event)"
    />

    <NavMenu v-else
             :open="openLeftNavigationDrawer"
             @drawerOpened="handleDrawerChange('left', $event)"
             v-bind:sidebar="sidebar"
    />
  </div>
</template>

<script>
  import NavMenu from './NavMenu'
  import NavCart from './NavCart'
  import SignInModal from '../common/modals/SignIn'
  import RegisterModal from '../common/modals/Register'
  import ForgotPasswordModal from '../common/modals/ForgotPassword'
  import VerifyOtpModal from '../common/modals/VerifyOtp'
  import SocialLoginModal from '../common/modals/SocialLogin'
  import ResetPasswordModal from '../common/modals/ResetPassword'
  import SuccessDialogModal from '../common/modals/SuccessDialog'
  import BackToTopBtn from '../common/btn/BackToTop'
  import ChatBtn from '../common/btn/Chat'

  export default {
    components: {
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
                      }, {
                        title: 'Instant Concrete',
                        to: '/'
                      }, {
                        title: 'Normal Concrete',
                        to: '/'
                      }, {
                        title: 'Pipe and Precast',
                        to: '/'
                      }, {
                        title: 'Cement',
                        to: '/'
                      },
                    ]
                  }
                ]
              },
              {
                text: 'Roof',
                title: 'Roof',
                to: '/services',
              }, {
                text: 'Kitchen',
                title: 'Kitchen',
                to: '/services',
              }, {
                text: 'Furniture',
                title: 'Furniture',
                to: '/services',
              }, {
                text: 'Bathroom',
                title: 'Bathroom',
                to: '/services',
              }, {
                text: 'Floor & Wall',
                title: 'Floor & Wall',
                to: '/services',
              }, {
                text: 'Bedroom',
                title: 'Bedroom',
                to: '/services',
              }, {
                text: 'Outdoor',
                title: 'Outdoor',
                to: '/services',
              },
            ]
          },
          {
            title: 'PACKAGES & SERVICES',
            submenu: [
              {
                text: 'Packages',
                title: 'Packages',
                to: '/packages',
              },
              {
                text: 'Services',
                title: 'Services',
                to: '/services',
              }
            ]
          },
          {title: 'PROMO', to: '/promo'},
          {title: 'BLOG', to: '/blog'},
          {title: 'INSPIRING LOOKS', to: '/inspiring-looks'},
          {title: 'MEMBERSHIP', to: '/membership'},
          {title: 'ONLINE CONSULTATION', to: '/online-consultation'},
        ],
      }
    },
    methods: {
      handleDrawerChange(type, isOpen) {
        if (type === "left") {
          this.openLeftNavigationDrawer = isOpen;
        } else {
          this.openRightNavigationDrawer = isOpen;
        }
      },
      async logout() {
        this.$nuxt.$loading.start()
        this.$store.commit('user/SET_BEFORE_LOGIN', '/');
        $nuxt.$auth.logout();
        $nuxt.$loading.finish()
        this.$auth.redirect('/')
      },
    },
  }
</script>

<style scoped>
  .padding-0 {
    padding: 0px;
  }

  .col-nav-menu {
    align-self: center;
    display: inline-flex
  }

  .nolinkstyle {
    color: #000;
    text-decoration: unset;
  }

  v-btn {
    font-size: 12px;
  }
</style>
