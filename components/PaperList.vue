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
        <v-card flat>
          <v-card-text>Tics</v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-list>
          <template v-for="(p, index) in mypapers">
            <PaperListItem :paper="p" :key="index"/>
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
  components:{
    PaperListItem
  },

  data() {
    return {
      tab: 2
    };
  },

  computed: {
    ...mapGetters({
      mypapers: "paperlist/mypapers"
    })
  },

  created() {
    this.$store
      .dispatch("paperlist/loadMyPapers", this.$fireAuth.currentUser.uid)
      .then(() => {
        console.log(this.mypapers);
      });
  }
};
</script>

<style scoped></style>
