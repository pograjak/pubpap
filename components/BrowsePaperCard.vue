<template>
  <v-card two-line alt="ndao" :to="`/paper/${paper.paperId}`" :title="paper.title">
    <v-img :src="imgUrl" height="150px">
      <template v-slot:placeholder>
        <v-skeleton-loader v-if="imgLoading" type="image"></v-skeleton-loader>
        <div v-else class="d-flex align-center justify-center grey lighten-3" style="height:150px">
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
    paper: Object
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