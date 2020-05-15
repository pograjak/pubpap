<template>
  <v-list-item three-line>
    <v-list-item-title>{{ paper.title }}</v-list-item-title>
    <!-- <v-list-item-subtitle>{{ paper.id }}</v-list-item-subtitle> -->
  </v-list-item>
</template>

<script>
export default {
  props: {
    paper: Object
  }
};
</script>

<style scoped>
</style>