<template>
  <div class="">
    <p>
      {{ user }}
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style>
</style>
