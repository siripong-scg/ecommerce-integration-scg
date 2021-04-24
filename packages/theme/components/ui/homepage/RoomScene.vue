<template>
  <v-container class="mt-5">
    <v-row class="mt-10 mb-10 room-scene">
      <v-col lg="6" md="12" class="h-full self-center" align="center">
        <h2 class="text-3xl font-bold">Endless Home Ideas</h2>
        <v-card-subtitle class="font-light"
          >Click here and discover a variety of inspirations to <br />
          beautify your favorite home.
        </v-card-subtitle>
        <v-btn color="primary" rounded>Discover inspirations</v-btn>
      </v-col>
      <v-col lg="6" md="12" class="pa-0">
        <Carousel :items="roomScenes" ratio="75%"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Carousel from '~/components/common/carousels'

export default {
  components: {
    Carousel,
  },
  data() {
    return {
      roomScenes: [
        {
          desktop: require(`~/assets/images/homepage/room-scene/bedroom/bedroom-desktop.png`),
          mobile: require(`~/assets/images/homepage/room-scene/bedroom/bedroom-desktop.png`),
        },
        {
          desktop: require(`~/assets/images/homepage/room-scene/bedroom/bedroom-desktop.png`),
          mobile: require(`~/assets/images/homepage/room-scene/bedroom/bedroom-desktop.png`),
        },
        {
          desktop: require(`~/assets/images/homepage/room-scene/bedroom/bedroom-desktop.png`),
          mobile: require(`~/assets/images/homepage/room-scene/bedroom/bedroom-desktop.png`),
        },
        {
          desktop: require(`~/assets/images/homepage/room-scene/bedroom/bedroom-desktop.png`),
          mobile: require(`~/assets/images/homepage/room-scene/bedroom/bedroom-desktop.png`),
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.room-scene {
  background-color: #f0f0f0;
}

.container {
  @media screen and (min-width: 1700px) {
    margin: 10px 100px;
  }
  @media screen and (min-width: 1100px) and (max-width: 1699px) {
    max-width: 100%;
  }
  @media screen and (min-width: 760px) and (max-width: 1099px) {
    margin: 10px 20px;
  }
}
</style>
