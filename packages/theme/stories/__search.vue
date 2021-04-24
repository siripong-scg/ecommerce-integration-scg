<template>
<div class='container'>
  Search Keyword: {{searchKeyword}}
</div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      searchKeyword: this.$route.query.q
    };
  }
};
</script>

<style scoped>

</style>
