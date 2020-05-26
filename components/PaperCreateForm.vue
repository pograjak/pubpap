<template>
  <v-card>
    <v-card-title>Add your paper</v-card-title>
    <v-card-subtitle>Create a new page for your paper.</v-card-subtitle>

    <v-stepper v-model="stepper" vertical>
      <!-- arXiv link & fetch -->
      <v-stepper-step :complete="stepper > 1" step="1">
        arXiv link
        <small>Is your paper published on arXiv? If so, enter a link to fetch all data from there. If not, skip this step.</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-text-field
          label="Link to arXiv"
          placeholder="https://arxiv.org/abs/2003.14415"
          :disabled="disabled"
          v-model="fetchArxURL"
          :error-messages="textfieldErrors.arxivlink"
          class="pb-2"
          @keydown.enter="doFetchArxiv"
        ></v-text-field>
        <v-btn
          color="primary"
          :disabled="disabled"
          :loading="arxiv_loading"
          @click="doFetchArxiv"
        >fetch</v-btn>
        <v-btn text :disabled="disabled" @click="stepper = 2">Skip</v-btn>
      </v-stepper-content>

      <!-- Basic information -->
      <v-stepper-step :complete="stepper > 2" step="2">
        Basic information
        <small>Fill in the basic information.</small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <PaperCreateFormBasicInfo :disabled="disabled" ref="formBasicInfo" />
        <v-btn color="primary" @click="submitBasicInfo">Continue</v-btn>
        <v-btn text :disabled="disabled" @click="stepper = 1">Back</v-btn>
      </v-stepper-content>

      <!-- Thumbnail upload -->
      <v-stepper-step :complete="stepper > 3" step="3">
        Thumbnail
        <small>Upload a thumbnail for your paper.</small>
      </v-stepper-step>

      <v-stepper-content step="3">
        <p class="subtitle-2">
          If you have a cool thumbnail for your paper, feel free to upload it!
          We accept either PNG or JPG.
        </p>
        <ImageUpload
          ref="imageUploader"
          @selected="imguploadBtnText = 'next'"
          @canceled="imguploadBtnText = 'skip'"
        />
        <v-btn color="primary" @click="stepper = 4;">{{ imguploadBtnText }}</v-btn>
        <v-btn text @click="stepper = 2">Back</v-btn>
      </v-stepper-content>

      <!-- Online presentation -->
      <v-stepper-step :complete="stepper > 4" step="4">
        Online presentation
        <small>Setup online presentation.</small>
      </v-stepper-step>

      <v-stepper-content step="4">
        <PaperCreateFormOnlinePres ref="formPresInfo" />
        <p v-if="submit_error" class="caption mb-0 error--text">Error submitting paper.</p>
        <v-btn
          :class="{ error: submit_error }"
          :loading="submit_loading"
          color="primary"
          @click="submitPaper"
        >Submit paper</v-btn>
        <v-btn text @click="stepper = 3">Back</v-btn>
      </v-stepper-content>

      <!-- Submitted paper -->
      <v-stepper-step :complete="stepper >= 5" step="5">
        Share
        <small>Share the paper page!</small>
      </v-stepper-step>

      <v-stepper-content step="5">
        <h3 class="subtitle-1">Success!</h3>
        <p class="subtitle-2">
          Link to paper page:
          <nuxt-link class="grey--text text--darken-1" :to="newPaperPage">
            {{
            newPaperURL
            }}
          </nuxt-link>
          <!-- <a  :href=""></a> -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon v-clipboard:copy="newPaperURL">
                <v-icon>mdi-clipboard-text-outline</v-icon>
              </v-btn>
            </template>
            <span class="caption">Copy to clipboard</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="#1da1f2" icon @click="twitterClick">
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
            </template>
            <span class="caption">Tweet</span>
          </v-tooltip>
        </p>

        <v-btn color="primary" @click="clearForm">Add another</v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import { fetchArxiv } from "~/plugins/arxiv.js";
import PaperCreateFormBasicInfo from "~/components/PaperCreateFormBasicInfo.vue";
import PaperCreateFormOnlinePres from "~/components/PaperCreateFormOnlinePres.vue";

Vue.use(VueClipboard);

import ImageUpload from "~/components/ImageUpload.vue";

export default {
  data() {
    return {
      // Page essentials
      stepper: 1,
      fetchArxURL: "",
      disabled: false,
      arxiv_loading: false,
      submit_loading: false,
      submit_error: false,
      newPaperId: "",
      imguploadBtnText: "skip",

      textfieldErrors: {
        arxivlink: ""
      }
    };
  },

  computed: {
    ...mapGetters(["user"]),
    newPaperURL() {
      return "http://" + window.location.hostname + "/paper/" + this.newPaperId;
    },
    newPaperPage() {
      return "/paper/" + this.newPaperId;
    }
  },

  components: {
    ImageUpload,
    PaperCreateFormBasicInfo,
    PaperCreateFormOnlinePres
  },

  methods: {
    async doFetchArxiv() {
      try {
        this.arxiv_loading = true;
        this.textfieldErrors.arxivlink = "";

        let ret = await fetchArxiv(this.fetchArxURL);
        this.$refs.formBasicInfo.push(ret);

        // Control UI
        this.arxiv_loading = false;
        this.stepper = 2;
      } catch (err) {
        console.log(err);
        this.textfieldErrors.arxivlink = "Error loading from arXiv.";
        this.arxiv_loading = false;
      }
    },

    submitBasicInfo() {
      if (this.$refs.formBasicInfo.validate()) {
        this.stepper = 3;
      }
    },

    async submitPaper() {
      try {
        this.submit_error = false;
        this.submit_loading = true;
        let pap = this.$refs.formBasicInfo.fetch();
        pap["requestPresentation"] = this.$refs.formPresInfo.fetch();
        pap["authorId"] = this.user.id;
        pap["authorName"] = this.user.displayName;
        pap["createdAt"] = this.$fireStoreObj.FieldValue.serverTimestamp();
        pap["favs"] = [];

        const imgobj = this.$refs.imageUploader.getImage();
        pap["hasImg"] = imgobj != null;

        console.log(pap);

        let docRef = await this.$store.dispatch("paper/addPaper", pap);

        this.newPaperId = docRef.id;

        if (imgobj) {
          await this.$store.dispatch("paper/uploadThumbnail", {
            paperId: docRef.id,
            skipHasImgUpdate: true,
            img: imgobj.img
          });
        }

        this.stepper = 5;
      } catch (err) {
        console.log(err);
        this.submit_error = true;
      }

      this.submit_loading = false;
    },

    twitterClick() {
      let url = "https://twitter.com/share?url=" + this.newPaperURL;
      window.open(url, "newwindow", "width=600, height=600");
    },

    clearForm() {
      this.stepper = 1;
      this.fetchArxURL = "";
      this.arxiv_loading = false;
      this.submit_loading = false;
      this.submit_error = false;
      this.newPaperId = "";
      this.imguploadBtnText = "skip";
      this.textfieldErrors.arxivlink = "";

      this.$refs.formBasicInfo.reset();
      this.$refs.formPresInfo.reset();
      this.$refs.imageUploader.setupCropper(null);
    }
  }
};
</script>

<style scoped>
.v-stepper {
  box-shadow: none;
}
</style>
