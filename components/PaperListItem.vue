<template>
  <v-list-item two-line link nuxt :to="`/paper/${paper.id}`">
    <v-list-item-content>
      <v-list-item-title>{{ paper.title }}</v-list-item-title>
      <v-list-item-subtitle class="caption">Created {{ paper.createdAt.toDate() | moment('lll') }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-content class="justify-end mx-2" style="max-width:150px">
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
    <v-list-item-action class="d-inline" v-if="isAuthor">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            large
            v-on="on"
            @click.prevent="thumbnailDialog = true"
            @mousedown.stop
            @touchstart.native.stop
          >
            <v-icon>mdi-image-edit</v-icon>
          </v-btn>
        </template>
        <span>Change thumbnail</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
            large
            @click.prevent="deleteDialog = true"
            @mousedown.stop
            @touchstart.native.stop
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Request removal</span>
      </v-tooltip>
    </v-list-item-action>

    <!-- Delete dialog -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="title font-weight-bold">Delete Paper</v-card-title>

        <v-card-text class="error--text text--darken-1 red lighten-4 py-4">
          Do you really want to delete the whole paper
          <strong>discussion</strong> and
          <strong>presentation requests?</strong>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDialog = false">Cancel</v-btn>
          <!-- TODO: Change to our email -->
          <v-btn
            color="error"
            error
            :href="`mailto:delete@pubpap.com?subject=Please delete paper ID \'${paper.id}\'&body=Dear pubpap team,%0D%0A%0D%0AI would like to request a removal of paper \'${paper.title}\' - ID: \'${paper.id}\' because of the following reasons:%0D%0A%0D%0A`"
            @click="deleteDialog = false"
          >Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Change Thumbnail dialog -->
    <v-dialog v-model="thumbnailDialog" max-width="800px">
      <v-card>
        <v-card-title>Change thumbnail</v-card-title>
        <div class="px-6">
          <ImageUpload
            ref="imageUploader"
            @selected="imguploadBtnText = 'Upload'"
            @canceled="imguploadBtnText = 'Delete current'"
          />
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancelThumbDiag">Cancel</v-btn>
          <v-btn
            color="primary"
            :loading="thumbnailLoading"
            @click="submitThumbDiag"
          >{{ imguploadBtnText }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script>
import ImageUpload from "~/components/ImageUpload.vue";
import Vue from "vue";
Vue.use(require("vue-moment"));

export default {
  props: {
    paper: Object
  },

  data() {
    return {
      deleteDialog: false,
      thumbnailDialog: false,
      thumbnailLoading: false,
      imguploadBtnText: "Delete current"
    };
  },

  components: {
    ImageUpload
  },

  computed: {
    isAuthor() {
      return this.$fireAuth.currentUser.uid == this.paper.authorId;
    }
  },

  methods: {
    cancelThumbDiag() {
      this.$refs.imageUploader.setupCropper(null);
      this.thumbnailDialog = false;
    },
    submitThumbDiag() {
      this.thumbnailLoading = true;

      // Retrieve image
      const imgobj = this.$refs.imageUploader.getImage();

      if (imgobj == null) {
        this.$store
          .dispatch("paper/deleteThumbnail", this.paper.id)
          .then(() => {
            this.thumbnailLoading = false;
            this.thumbnailDialog = false;
          });
      } else {
        this.$store
          .dispatch("paper/uploadThumbnail", {
            paperId: this.paper.id,
            img: imgobj.img
          })
          .then(() => {
            this.thumbnailLoading = false;
            this.thumbnailDialog = false;
          });
      }
    }
  }
};
</script>

<style scoped>
</style>