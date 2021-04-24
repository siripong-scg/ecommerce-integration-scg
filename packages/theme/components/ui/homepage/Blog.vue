<template>
  <v-container class="mb-5">
    <v-row no-gutters>
      <v-col cols="12"><h3 class="text-3xl font-bold mb-5">Blog</h3></v-col>
      <v-col
        v-for="(blog, i) in blogs"
        :key="i"
        lg="4"
        md="12"
        class="pr-2 pl-2"
        align="left"
      >
        <v-card class="mx-auto blog-card">
          <v-img :src="blog.src" />
          <v-card-title class="pl-0 blog-title">{{ blog.title }}</v-card-title>
          <v-card-subtitle class="pl-0">{{ blog.sub_title }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" align="center" class="mt-5">
        <v-btn color="primary" rounded outlined>More Content</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      blogs: [
        {
          title: 'Serunya Renovasi Rumah Jelang Ramadhan',
          sub_title:
            'Bulan Ramadan yang semakin dekat tentu membuat umat muslim melakukan beragam persiapan. Selain persiapan mental, maka persiapan lain yang umu…',
          src: require(`~/assets/images/homepage/blog/serunya/serunya-desktop.jpg`),
        },
        {
          title:
            'Langkah Mudah Mengumpulkan Biaya Renovasi Dari Gaji Tiap Bulan',
          sub_title:
            'Merenovasi hunian tentu membutuhkan biaya  yang tidak sedikit. Banyak orang yang rela menabung demi memiliki hunian. Bagi pemilik hunian yang…',
          src: require(`~/assets/images/homepage/blog/langkah/langkah-desktop.jpg`),
        },
        {
          title: '3 Faktor yang Dapat Menciptakan Kondisi Nyaman di  Rumah',
          sub_title:
            'Rumah dapat diibaratkan sebagai surga di dunia. Sebab di dalam rumah tersebut bisa menjadi sumber utama kebahagiaan, kenyamanan, ketenangan, dan…',
          src: require(`~/assets/images/homepage/blog/faktor/faktor-desktop.jpg`),
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.v-card__title {
  font-size: 16px;
}

.blog-card {
  background-color: rgba(255, 255, 255, 0.5) !important;
  border-color: white !important;
  border-radius: 20px;

  ::v-deep .v-image {
    border-radius: 20px;
  }
}

.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
</style>
