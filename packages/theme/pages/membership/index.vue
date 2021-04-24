<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="membership">
          <v-card-text>
            <div class="members blog">
              <v-img class="mr-3" :src="require(`~/assets/images/membership/Diskon-Member-1024x410.jpeg`)"/>
            </div>
            <div class="member-level blog">
              <v-img class="mr-3"
                     :src="require(`~/assets/images/membership/Member-level-mitraruma-2020-1024x410.jpeg`)"/>
            </div>
            <v-row>
              <v-col cols="12" align="center">
                <v-btn color="primary" @click="$modal.show('RegisterModal')" rounded>Come Join</v-btn>
              </v-col>
            </v-row>
            <div class="voucher blog">
              <v-img class="mr-3"
                     :src="require(`~/assets/images/membership/voucher_sodexo-1024x410.jpeg`)"/>
            </div>
            <div class="condition blog">
              <h2 class="font-bold text-2xl ma-5 text-gray-500" >
                Syarat dan kententuan penukaran poin</h2>
              <ul id="term_condition">
                <li v-for="item in terms" :key="item.data" class="ml-10">
                  {{ item.data }}
                </li>
              </ul>
            </div>
            <div class="condition blog">
              <h2 class="font-bold text-2xl ma-5 text-gray-500" >
                Syarat dan kententuan Member dan Poin</h2>
              <ul id="member_condition">
                <li v-for="item in members" :key="item.data" class="ml-10">
                  {{ item.data }}
                </li>
              </ul>
            </div>
          </v-card-text>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  const getContents = () => import('~/static/json/membership.json').then(m => m.data || m)
  export default {
    head() {
      return {
        title: 'Membership',
      }
    },
    data() {
      return {
        membership: [],
        terms: [
          {data: '1000 poin Mitraruma dapat ditukarkan dengan voucher Sodexo Rp.50.000'},
          {data: '2000 poin Mitraruma dapat ditukarkan dengan voucher Sodexo Rp.110.000'},
          {data: 'Penukaran poin dapat dilakukan pada fitur chat Mitraruma'},
        ],
        members: [
          {data: 'Masa aktif anggota dan poin berlaku 1 tahun'},
          {data: 'Penukaran dan masa kedaluwarsa poin rewards mengacu kepada syarat dan ketentuan yang sudah ditetapkan dan berlaku.'},
          {data: 'Syarat dan ketentuan dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu.'},
        ]
      }
    },
    async fetch() {
      const membership = await getContents();
      this.membership = membership
    }
  };
</script>

<style lang="scss" scoped>
  .blog {
    margin: 10px 0 10px 0;
  }

  #term_condition {
    list-style-type: disc;
  }

  #member_condition {
    list-style-type: decimal;
  }

  .privacy {
    margin: 10px 10px;
    @media screen and (min-width: 1700px) {
      margin: 10px 100px;
    }
    @media screen and (min-width: 1100px) and (max-width: 1699px) {
      margin: 10px 50px;
    }
    @media screen and (min-width: 760px) and (max-width: 1099px) {
      margin: 10px 20px;
    }
  }
</style>
