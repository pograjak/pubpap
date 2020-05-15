<template>
  <v-card class="mx-auto" min-width="320px" outlined>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card-title>{{ paper.title }}</v-card-title>
          <v-card-subtitle>{{ paper.authors }}</v-card-subtitle>
        </v-col>
      </v-row>
      <v-row v-if="paper.hasImg & !images.loadingErr" no-gutters>
        <v-col class="d-md-flex">
          <div>
            <v-card-text class="pt-0">{{ paper.summary }}</v-card-text>
          </div>
          <div class="px-4">
            <v-img
              contain
              max-width="350px"
              max-height="350px"
              :src="images.paper"
              style="margin: 0 auto"
            >
              <template v-slot:placeholder>
                <div class="pt-6 fill-width text-center">
                  <v-progress-circular indeterminate></v-progress-circular>
                </div>
              </template>
            </v-img>
          </div>
        </v-col>
        <!-- <v-col class="py-0" cols="12" md="8">
          
        </v-col>-->
        <!-- <v-col cols="12" md="4">
          
        </v-col>-->
      </v-row>
      <!-- if no image present -->
      <v-row v-else no-gutters>
        <v-col class="py-0">
          <v-card-text class="pt-0">{{ paper.summary }}</v-card-text>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-card-actions class="px-4">
            <v-btn color="white-black">arXiv</v-btn>
            <v-btn color="white-black">arXiv PDF</v-btn>
            <v-btn color="white-black">
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      images: {
        loadingErr: false,
        paper: ""
      }
    };
  },

  created() {
    if (this.$route.params.id) {
      this.$store
        .dispatch("paper/loadPaper", this.$route.params.id)
        .then(() => {
          if (this.paper.hasImg) {
            // load image if the paper has it
            const imgName = "paper_thumbnails/" + this.$route.params.id;
            this.$fireStorage
              .ref(imgName)
              .getDownloadURL()
              .then(url => {
                this.images.paper = url;
                console.log(url);
              })
              .catch(err => {
                console.log("Error loading image.");
                this.images.loadingErr = true;
                throw err;
              });
          }
        });

      // this.$fireStorage
      //         .ref()
      //         .child(imgName)
      //         .putString(this.thumbnailObj.img, "data_url")
    }
  },

  computed: {
    ...mapGetters({
      paper: "paper/paper"
    })
  }
};
</script>

<style scoped></style>

