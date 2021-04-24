<template>
  <v-main>
    <Carousel :items="banners" ratio="480px" pagination />
    <GroupCategories />
    <ProductCategories />
    <RoomScene />
    <Blog />
    <PopularProduct />
    <VdoTestimonial />
  </v-main>
</template>

<script>
import Carousel from '~/components/common/carousels';
import GroupCategories from '~/components/ui/homepage/GroupCategories';
import ProductCategories from '~/components/ui/homepage/ProductCategories';
import RoomScene from '~/components/ui/homepage/RoomScene';
import Blog from '~/components/ui/homepage/Blog';
import PopularProduct from '~/components/ui/homepage/PopularProduct';
import VdoTestimonial from '~/components/ui/homepage/VdoTestimonial';

export default {
  components: {
    Carousel,
    GroupCategories,
    ProductCategories,
    RoomScene,
    Blog,
    PopularProduct,
    VdoTestimonial
  },
  data() {
    return {
      authProvider: null,
      socialEmail: null,
      banners: [
        {
          desktop: require(`~/assets/images/homepage/banner/banner-desktop.png`),
          mobile: require(`~/assets/images/homepage/banner/banner-mobile.jpg`)
        },
        {
          desktop: require(`~/assets/images/homepage/banner/banner-desktop.png`),
          mobile: require(`~/assets/images/homepage/banner/banner-mobile.jpg`)
        },
        {
          desktop: require(`~/assets/images/homepage/banner/banner-desktop.png`),
          mobile: require(`~/assets/images/homepage/banner/banner-mobile.jpg`)
        },
        {
          desktop: require(`~/assets/images/homepage/banner/banner-desktop.png`),
          mobile: require(`~/assets/images/homepage/banner/banner-mobile.jpg`)
        }
      ]
    };
  },
  head() {
    return {
      title: 'Home'
    };
  },
  async mounted() {
    // if (!$nuxt.$auth.loggedIn) {
    //   if (this.$route.query.signupToken !== undefined) {
    //     this.authProvider = this.$route.query.authProvider;
    //     this.socialEmail = this.$route.query.email;
    //     this.$modal.show('SocialLoginModal');
    //   } else if (this.$route.query.resetPassToken !== undefined) {
    //     this.$modal.show('ResetPasswordModal');
    //   } else if (this.$route.query.accessToken !== undefined) {
    //     this.getUserInfo(this.$route.query.accessToken);
    //   }
    // }
  },
  methods: {
    async getUserInfo(accessToken) {
      // this.$nuxt.$loading.start();
      // await this.$repositories.user
      //   .getUserInfo(accessToken)
      //   .then((res) => {
      //     if (res.userId) {
      //       this.$auth.setToken('local', `Bearer ${accessToken}`);
      //       this.$axios.setToken(accessToken, 'Bearer');
      //       this.$auth.setRefreshToken('local', false);
      //       res.preferredLanguage = 'th'; /* TODO: Fix to use TH as default */
      //       res.orgIdfier = 'scg';
      //       this.$auth.setUser(res);
      //       this.$nuxt.$loading.finish();
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     this.$nuxt.$loading.finish();
      //   });
    }
  }
};
</script>
