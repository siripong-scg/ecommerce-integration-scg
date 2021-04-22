<template>
  <div id="login-modal">
    <Modal v-if="show" :onCloseClick="onCloseClick" show> Modal For Login </Modal>
  </div>
</template>

<script>
import Modal from '~/components/common/Modal';
export default {
  components: {
    Modal
  },
  props: {
    show: Boolean,
    onCloseClick: Function
  }
};
</script>

<style></style>
