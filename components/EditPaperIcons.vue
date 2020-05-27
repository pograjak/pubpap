<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          large
          v-on="on"
          @click.prevent="openEditDialog"
          @mousedown.stop
          @touchstart.native.stop
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <span>Edit basic information</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          large
          v-on="on"
          @click.prevent="openThumbDiag"
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
          @click.prevent="deleteDiag = true"
          @mousedown.stop
          @touchstart.native.stop
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <span>Request removal</span>
    </v-tooltip>

    <!-- edit Dialog -->
    <v-dialog v-model="editDiag" max-width="1200px">
      <v-card>
        <v-card-title>Change basic information</v-card-title>
        <v-card-text class="py-0">
          <PaperCreateFormBasicInfo ref="formBasicInfo" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="editDiag = false">Cancel</v-btn>
          <v-btn color="primary" :loading="editDiagLoading" @click="submitPaperEdit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete dialog -->
    <v-dialog v-model="deleteDiag" max-width="400px">
      <v-card>
        <v-card-title class="title font-weight-bold">Delete Paper</v-card-title>

        <v-card-text class="error--text text--darken-1 red lighten-4 py-4">
          Do you really want to delete the whole paper
          <strong>discussion</strong> and
          <strong>presentation requests?</strong>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDiag = false">Cancel</v-btn>
          <!-- TODO: Change to the support email -->
          <v-btn
            color="error"
            error
            :href="`mailto:tomas@redcute.cz, jakub@redcute.cz?subject=[pubpap] Please delete paper ID \'${paper.id}\'&body=Dear pubpap team,%0D%0A%0D%0AI would like to request a removal of paper \'${paper.title}\' - ID: \'${paper.id}\' because of the following reasons:%0D%0A%0D%0A`"
            @click="deleteDiag = false"
          >Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Change Thumbnail dialog -->
    <v-dialog v-model="thumbDiag" max-width="800px">
      <v-card>
        <v-card-title>Change thumbnail</v-card-title>
        <div class="px-6">
          <ImageUpload
            ref="imageUploader"
            :paperId="paper.id"
            @selected="thumbDiagDisable.upload = false"
            @canceled="thumbDiagDisable.upload = true"
            @loadedRemote="thumbDiagDisable.delete = false"
          />
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancelThumbDiag">Cancel</v-btn>
          <v-btn
            text
            :loading="thumbDiagLoading.delete"
            :disabled="thumbDiagDisable.delete"
            @click="deleteThumbDiag"
          >Delete current</v-btn>
          <v-btn
            color="primary"
            :disabled="thumbDiagDisable.upload"
            :loading="thumbDiagLoading.upload"
            @click="uploadThumbDiag"
          >Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ImageUpload from "~/components/ImageUpload.vue";
import PaperCreateFormBasicInfo from "~/components/PaperCreateFormBasicInfo.vue";

export default {
  props: {
    paper: Object
  },
  components: {
    ImageUpload,
    PaperCreateFormBasicInfo
  },
  data() {
    return {
      editDiag: false,
      deleteDiag: false,
      thumbDiag: false,
      editDiagLoading: false,
      thumbDiagLoading: {
        upload: false,
        delete: false
      },
      thumbDiagDisable: {
        upload: true,
        delete: true
      }
    };
  },

  methods: {
    openThumbDiag() {
      this.thumbDiag = true;
      this.thumbDiagDisable.upload = true;
      this.thumbDiagDisable.delete = true;
      if (this.$refs.imageUploader) {
        this.$refs.imageUploader.reloadRemoteImg();
      }
    },
    cancelThumbDiag() {
      this.$refs.imageUploader.setupCropper(null);
      this.thumbDiag = false;
    },
    deleteThumbDiag() {
      this.thumbDiagLoading.delete = true;
      this.$store.dispatch("paper/deleteThumbnail", this.paper.id).then(() => {
        this.thumbDiagLoading.delete = false;
        // this.thumbDiagDisable.delete = true;
        this.thumbDiag = false;
        this.$refs.imageUploader.setupCropper(null);
      });
    },
    uploadThumbDiag() {
      this.thumbDiagLoading.upload = true;

      // Retrieve image
      const imgobj = this.$refs.imageUploader.getImage();

      this.$store
        .dispatch("paper/uploadThumbnail", {
          paperId: this.paper.id,
          img: imgobj.img
        })
        .then(() => {
          this.thumbDiagLoading.upload = false;
          this.thumbDiag = false;
          this.$refs.imageUploader.setupCropper(null);
        });
    },
    async openEditDialog() {
      this.editDiag = true;
      await this.$nextTick();
      this.$refs.formBasicInfo.push(this.paper);
    },
    async submitPaperEdit() {
      if (!this.$refs.formBasicInfo.validate()) {
        return;
      }
      this.editDiagLoading = true;
      await this.$store.dispatch("paperlist/editPaper", {
        paperId: this.paper.id,
        changes: this.$refs.formBasicInfo.fetch()
      });
      this.editDiagLoading = false;
      this.editDiag = false;
    }
  }
};
</script>