<template>
  <v-list class="py-0">
    <v-divider />
    <!-- Loading spinner -->
    <v-list-item two-line v-if="showLoading">
      <v-list-item-content>
        <LoadingSpinner />
      </v-list-item-content>
    </v-list-item>
    <!-- Empty placeholder -->
    <v-list-item two-line v-if="showEmpty">
      <v-list-item-content>
        <v-list-item-title class="text-center caption d-flex align-center justify-center">
          <v-icon>{{ emptyIcon }}</v-icon>
          <span>
          &nbsp;{{ emptyPlaceholder }}
          </span>
          <!-- No favorite papers -->
          <!-- <v-icon>mdi-star-off</v-icon> -->
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <template v-for="(p, index) in papers">
      <PaperListItem :showEditIcons="showEditIcons" :paper="p" :key="index" />
      <v-divider :key="index+1000" />
    </template>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
import PaperListItem from "~/components/PaperListItem.vue";
import LoadingSpinner from "~/components/LoadingSpinner.vue";

export default {
  components: {
    PaperListItem,
    LoadingSpinner
  },

  props: {
    storeDispatchFcn: String,
    storePapersGetter: String,
    emptyPlaceholder: String,
    emptyIcon: String,
    showEditIcons: Boolean
  },

  data() {
    return {
      showLoading: false,
      showEmpty: false
    };
  },

  created() {
    this.showLoading = true;
    this.$store
      .dispatch(this.storeDispatchFcn, {
        userId: this.$fireAuth.currentUser ? this.$fireAuth.currentUser.uid : undefined
      })
      .then(() => {
        this.showLoading = false;
        if (this.papers.length == 0) {
          this.showEmpty = true;
        }
      });
  },

  computed: {
    papers() {
      return this.$store.getters[this.storePapersGetter];
    }
  }
};
</script>

<style scoped></style>
