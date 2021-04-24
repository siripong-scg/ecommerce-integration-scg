<template>
  <v-sheet class="mx-auto popular-product">
    <v-container class="pb-0 pt-5">
      <v-row no-gutters>
        <v-col class="self-center">
          <h3 class="text-3xl font-bold mb-5">Popular Product</h3>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-slide-group
        class="pa-4"
        show-arrows
        prev-icon="mdi-chevron-left-circle"
        next-icon="mdi-chevron-right-circle"
      >
        <v-slide-item v-for="i in 10" :key="i" class="ma-5">
          <v-card class="cardColor" max-width="230px" rounded>
            <v-img
              class="product-img"
              :src="
                require(`~/assets/images/homepage/products/Image 44_2021-04-15/Image 44.png`)
              "
              height="188px"
            />
            <v-card-subtitle class="px-0 py-3">Furniture</v-card-subtitle>
            <v-card-text class="px-0">
              <span class="font-bold black--text">Product {{ i }}</span> <br />
              <span class="font-bold black--text">Rp1.650.000,00</span>
            </v-card-text>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-container>
  </v-sheet>
</template>

<script>
import Carousel from '~/components/common/carousels'

export default {
  components: {
    Carousel,
  },
  data() {
    return {
      model: [],
    }
  },
}
</script>

<style lang="scss" scoped>
.popular-product {
  background-color: #f0f0f0;

  .product-img {
    border-radius: 20px !important;
  }

  .cardColor {
    background-color: #f0f0f0 !important;
    border-color: #f0f0f0 !important;
  }
}

.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
</style>
