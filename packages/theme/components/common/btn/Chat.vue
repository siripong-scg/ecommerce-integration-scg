<template>
  <v-tooltip left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        fixed
        medium
        bottom
        right
        color="primary"
        class="chat-btn"
        v-bind="attrs"
        v-on="on"
      >
        <v-img max-width="25px" :src="require('~/assets/images/logo/sms/icon-sms-24px.png')"/>
      </v-btn>
    </template>
    <span>Hello, we’re here to help.</span>
  </v-tooltip>
</template>

<script>
  export default {
    data: () => ({}),

    methods: {}
  }
</script>
