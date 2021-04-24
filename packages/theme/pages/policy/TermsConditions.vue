<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="privacy">
          <v-card-text>
            <h4 class="text-3xl font-bold">Terms and Conditions</h4><br>
            <div id="privacy" v-html="termCondition"></div>
          </v-card-text>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  const getContents = () => import('~/static/json/contents.json').then(m => m.termCondition.contents || m)
  export default {
    head() {
      return {
        title: 'Terms and conditions',
      }
    },
    data() {
      return {
        termCondition: []
      }
    },
    async fetch() {
      const termCondition = await getContents();
      this.termCondition = termCondition
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
