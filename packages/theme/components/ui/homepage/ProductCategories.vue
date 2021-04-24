<template>
  <v-container class="mt-5 product-categories">
    <v-row>
      <v-col cols="12">
        <div class="text-center">
          <h3 class="text-2xl font-bold">Product Category</h3>
          <v-row class="mt-5">
            <v-col lg="3" md="6" align="center" v-for="(categorie,i) in categories" :key="i">
              <v-card
                outlined
              >
                <v-row>
                  <v-col cols="6" class="pr-0">
                    <v-img
                      :src="categorie.src"
                    />
                  </v-col>
                  <v-col cols="6" align="left" class="pl-4 self-center">
                    <span class="product-title">{{categorie.title}}</span>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        categories: [
          {
            title: 'FLOOR & WALL',
            name: 'floor',
            src: require(`~/assets/images/homepage/product-categories/floor/Mask Group 11.jpg`),
          },
          {
            title: 'KAMAR MANDI',
            name: 'kamar-mandi',
            src: require(`~/assets/images/homepage/product-categories/kamar-mandi/Mask Group 12.png`),
          },
          {
            title: 'DAPUR',
            name: 'dapur',
            src: require(`~/assets/images/homepage/product-categories/dapur/Mask Group 13.png`),
          },
          {
            title: 'HOME IMPROVEMENT',
            name: 'home-improvement',
            src: require(`~/assets/images/homepage/product-categories/home-improvement/Mask Group 14.png`),
          },
          {
            title: 'SEMEN & BETON',
            name: 'semen',
            src: require(`~/assets/images/homepage/product-categories/semen/Mask Group 15.png`),
          },
          {
            title: 'ATAP',
            name: 'atap',
            src: require(`~/assets/images/homepage/product-categories/atap/Mask Group 17.png`),
          },
          {
            title: 'RUANG TERBUKA',
            name: 'ruang-terbuka',
            src: require(`~/assets/images/homepage/product-categories/ruang-terbuka/Mask Group 16.png`),
          },
          {
            title: 'KAMAR TIDUR',
            name: 'kamar-tidur',
            src: require(`~/assets/images/homepage/product-categories/kamar-tidur/Mask Group 18.png`),
          }, {
            title: 'FURNITURE',
            name: 'furniture',
            src: require(`~/assets/images/homepage/product-categories/furniture/Mask Group 19.png`),
          }, {
            title: 'PAKET & JASA',
            name: 'paket-jasa',
            src: require(`~/assets/images/homepage/product-categories/paket-jasa/Mask Group 20.png`),
          },
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
.product-categories {
  .product-title {
    font-size: 15px;
    color: #525252;
    font-weight: bold;
  }
}
</style>
