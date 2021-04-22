<template>
  <div>
    <div v-if="!isLogedin">
      <button class="btn btn-primary outline" @click="onLoginClick()">Sign In</button>
      <button class="btn ml-2" @click="onRegisterClick()">Register</button>
    </div>
    <div v-else>
      loged in
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerBar',
  props: {
    isLogedin: Boolean,
    onLoginClick: Function,
    onRegisterClick: Function
  }
};
</script>

<style></style>
