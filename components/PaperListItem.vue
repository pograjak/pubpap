<template>
  <v-list-item two-line link nuxt :to="`/paper/${paper.id}`">
    <v-list-item-content>
      <v-list-item-title>{{ paper.title }}</v-list-item-title>
      <v-list-item-subtitle class="caption">Created {{ paper.createdAt.toDate() | moment('lll') }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-content class="justify-end" style="max-width:150px">
      <v-progress-linear
        rounded
        height="20"
        color="secondary"
        :value="(paper.requestPresentation.currentValue / paper.requestPresentation.goal) * 100"
        striped
      >
        <span class="grey--text text--darken-3 text-right mr-2 caption" style="flex: 1 auto">
          {{ paper.requestPresentation.currentValue / paper.requestPresentation.bid }} / {{ paper.requestPresentation.goal / paper.requestPresentation.bid }}
          <v-icon small class="primary--text">mdi-account-check</v-icon>
        </span>
      </v-progress-linear>
    </v-list-item-content>
    <v-list-item-action class="d-inline">
      <v-btn icon large @click.prevent="clicking" @mousedown.stop @touchstart.native.stop>
        <v-icon>mdi-image-edit</v-icon>
      </v-btn>
      <v-btn icon large @click.prevent="clicking" @mousedown.stop @touchstart.native.stop>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import Vue from "vue";
Vue.use(require("vue-moment"));

export default {
  props: {
    paper: Object
  },

  methods: {
    clicking() {
      return 0;
    }
  }
};
</script>

<style scoped>
</style>