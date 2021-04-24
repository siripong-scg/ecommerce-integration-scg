<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="privacy">
          <v-card-text>
            <h4 class="text-3xl font-bold">Privacy Policy</h4><br>
            <div id="privacy" v-html="policy"></div>
          </v-card-text>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  const getContents = () => import('~/static/json/contents.json').then(m => m.privacy.contents || m)
  export default {
    head() {
      return {
        title: 'Privacy Policy',
      }
    },
    data() {
      return {
        policy: []
      }
    },
    async fetch() {
      const contents = await getContents();
      this.policy = contents
    }
  };
</script>

<style lang="scss" scoped>
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
