<template>
  <v-card>
    <v-tabs v-model="tab">
      <v-tabs-slider></v-tabs-slider>

      <v-tab>
        <v-icon left>mdi-star</v-icon>Favorites
      </v-tab>

      <v-tab>
        <v-icon left>mdi-card-text-outline</v-icon>My Tickets
      </v-tab>

      <v-tab>
        <v-icon left>mdi-account</v-icon>My Papers
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text>Favs</v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-list class="py-0">
          <template v-for="(p, index) in sortPaps(subpapers)">
            <PaperListItem :paper="p" :key="index" />
          </template>
        </v-list>
      </v-tab-item>

      <v-tab-item>
        <v-list class="py-0">
          <template v-for="(p, index) in sortPaps(mypapers)">
            <PaperListItem :paper="p" :key="index" />
          </template>
        </v-list>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import PaperListItem from "~/components/PaperListItem.vue";

export default {
  components: {
    PaperListItem
  },

  data() {
    return {
      tab: 2
    };
  },

  created() {
    this.$store
      .dispatch("paperlist/loadMyPapers", this.$fireAuth.currentUser.uid)
      .then(() => {});
    this.$store
      .dispatch("paperlist/loadSubsPapers", this.$fireAuth.currentUser.uid)
      .then(() => {});
  },

  computed: {
    ...mapGetters({
      mypapers: "paperlist/mypapers",
      subpapers: "paperlist/subpapers"
    })
  },

  methods: {
    sortPaps(paplist) {
      var newpaps = [...paplist];
      return newpaps.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
    }
  }
};
</script>

<style scoped></style>
