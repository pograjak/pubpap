<template>
  <v-list-item three-line link nuxt :to="`/paper/${paper.paperId}`" style="min-height:70px">
    <v-list-item-content class="pt-2">
      <v-list-item-title>{{ paper.title }}</v-list-item-title>
      <!-- <v-list-item-subtitle class="caption">{{ paper.authors }}</v-list-item-subtitle> -->
      <!-- <v-list-item-subtitle class="caption">Created {{ paper.createdAt.toDate() | moment('lll') }}</v-list-item-subtitle> -->
      <v-container class="pa-0 ma-0">
        <v-row no-gutters>
          <User
            :date="paper.createdAt"
            :name="paper.authors"
          />
        </v-row>
      </v-container>
    </v-list-item-content>
    <v-list-item-content v-if="paper.requestPresentation.bid" class="justify-end mx-0" style="max-width:150px">
      <v-progress-linear
        rounded
        height="20"
        color="secondary"
        class
        :value="(paper.requestPresentation.currentValue / paper.requestPresentation.goal) * 100"
        striped
      >
        <span class="grey--text text--darken-3 text-right mr-2 caption" style="flex: 1 auto">
          {{ paper.requestPresentation.currentValue / paper.requestPresentation.bid }} / {{ paper.requestPresentation.goal / paper.requestPresentation.bid }}
          <v-icon small class="primary--text">mdi-account-check</v-icon>
        </span>
      </v-progress-linear>
    </v-list-item-content>
    <v-list-item-action class="d-inline my-0 align-self-center" v-if="isAuthor && showEditIcons">
      <EditPaperIcons :paper="paper" usedInPaperList largeIcons />
    </v-list-item-action>

  </v-list-item>
</template>

<script>
import { mapGetters } from "vuex";
import Vue from "vue";
import User from "~/components/User.vue";
import EditPaperIcons from "~/components/EditPaperIcons.vue";

Vue.use(require("vue-moment"));

export default {
  props: {
    paper: Object,
    showEditIcons: Boolean
  },

  components: {
    User,
    EditPaperIcons
  },

  computed: {
    ...mapGetters(["user"]),
    isAuthor() {
      if(this.user.id){
        return this.user.id == this.paper.authorId;
      }
      return false;
    }
  },

};
</script>

<style scoped>
</style>