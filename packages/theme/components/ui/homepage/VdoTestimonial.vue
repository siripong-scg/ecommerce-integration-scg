<template>
  <v-container class="mb-15 mt-15">
    <v-row no-gutters>
      <v-col class="self-center" lg="6" xs="10" md="10">
        <span class="text-3xl font-bold mb-5 mt-10 w-auto"
          >VDO Testimonial</span
        >
      </v-col>
      <v-col lg="6" xs="2" md="2" align="right" class="self-center">
        <a
          href="https://www.youtube.com/channel/UCCRDbd5rtmP5ind5gHBEFiQ"
          target="_blank"
          class="font-bold blue--text"
        >
          see more >
        </a>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="i in 3" :key="i" lg="4" xs="4" md="12" align="center">
        <div id="responsiveVideoWrapper" class="video-section">
          <iframe
            class="video"
            src="https://www.youtube.com/embed/o00XlIUIFJ0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.video-section {
  position: relative;
  padding-bottom: 56.2%;
  .video {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
</style>
