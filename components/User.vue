<template>
  <v-col cols="auto">
    <!-- <v-row no-gutters> -->
    <!-- <v-col cols="1"> -->
    <!-- <v-icon>mdi-account</v-icon> -->
    <!-- </v-col> -->
    <!-- <v-col> -->
    <!-- <v-list-item-subtitle class="font-weight-bold">{{ name }}</v-list-item-subtitle> -->
    <!-- <v-list-item-subtitle class="caption">Created {{ date | format-timestamp }}</v-list-item-subtitle> -->
    <p class="name grey--text text--darken-1" v-bind:class="{ 'text-right': rightAlign }">
      {{ name }}
      <br />
      <small>Created {{ nonNullDate | moment('lll') }}</small>
    </p>
    <!-- </v-col> -->
    <!-- </v-row> -->
  </v-col>
</template>

<script>
import Vue from "vue";
Vue.use(require('vue-moment'));

export default {
  props: {
    date: Object,
    name: String,
    rightAlign: Boolean
  },
  methods: {},
  computed: {
    nonNullDate() {
      if (this.date != null) {
        return this.date.toDate();
      }
      return new Date(Date.now());
    }
  }
};
</script>

<style scoped>
.name {
  font-size: 10pt;
  max-height: 20px;
  padding-right: 10px;
  line-height: 100%;
  margin: 0;
  margin-bottom: 3px;
}
</style>