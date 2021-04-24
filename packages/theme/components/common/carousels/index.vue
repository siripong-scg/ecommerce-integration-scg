<template>
  <div class="carousels">
    <client-only>
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide
          v-for="(item, index) in items"
          :key="index"
          :style="{ paddingBottom: ratio }"
        >
          <img v-if="isMobile" class="banner-image" :src="item.mobile" />
          <img v-else class="banner-image" :src="item.desktop" />
        </swiper-slide>
        <div
          v-show="pagination"
          slot="pagination"
          class="swiper-pagination"
        ></div>
      </swiper>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    items: Array,
    ratio: {
      type: String,
      default: '56.2%', // 16:9
    },
    pagination: Boolean,
  },
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        loop: true,
      },
      width: 0,
    }
  },
  computed: {
    isMobile() {
      return this.width < 768
    },
  },
  mounted() {
    if (process.browser) {
      this.width = window.innerWidth
      window.onresize = this.onWindowChanged
    }
  },
  methods: {
    onWindowChanged() {
      process.browser && (this.width = window.innerWidth)
    },
  },
}
</script>

<style lang="scss" scoped>
.carousels {
  .swiper {
    width: 100%;
    .swiper-slide {
      position: relative;
      .banner-image {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
    .swiper-pagination {
      position: inherit;
      margin: 16px 0px;
      bottom: 0;

      ::v-deep .swiper-pagination-bullet {
        width: 12px;
        height: 12px;
        border: solid 1.5px #a8a8a8;
        margin: 0px 10px;
        background: white;
        opacity: 1;
      }

      ::v-deep .swiper-pagination-bullet-active {
        background-color: #a8a8a8;
      }
    }
  }
}
</style>
