<template>
  <div>
    <template v-if="showLoading">
      <v-card>
        <v-skeleton-loader type="image" height="150px"></v-skeleton-loader>
        <v-skeleton-loader type="list-item-two-line" height="66px"></v-skeleton-loader>
      </v-card>
    </template>
    <!-- <v-skeleton-loader v-if="showLoading" class="mx-auto" max-height="278" type="card"></v-skeleton-loader> -->

    <v-card v-else two-line alt="ndao" :to="`/paper/${paper.paperId}`" :title="paper.title">
      <v-img :src="imgUrl" height="150px">
        <template v-slot:placeholder>
          <v-skeleton-loader v-if="imgLoading" type="image"></v-skeleton-loader>
          <div
            v-else
            class="d-flex align-center justify-center grey lighten-3"
            style="height:150px"
          >
            <v-icon large>mdi-image</v-icon>
          </div>
        </template>
      </v-img>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="body-1">{{ paper.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ paper.authors }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-card-text>{{ paper.summary }}</v-card-text> -->
    </v-card>
  </div>
</template>

<script>
import User from "~/components/User.vue";

export default {
  data() {
    return {
      imgUrl: "",
      imgLoading: false
    };
  },

  props: {
    paper: Object,
    showLoading: Boolean
  },

  components: {
    User
  },

  created() {
    this.imgLoading = true;
    this.$store.dispatch("paper/loadImgUrl", this.paper.paperId).then(ret => {
      // console.log(ret);
      this.imgUrl = ret.url;
      if (this.imgUrl == "") {
        this.imgLoading = false; // allow to show placeholder only if image is empty
      }
    });
  }
};
</script>