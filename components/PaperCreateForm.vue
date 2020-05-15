<template>
  <v-card>
    <v-card-title>Add your paper</v-card-title>
    <v-card-subtitle>Create a new page for your paper.</v-card-subtitle>

    <v-stepper v-model="stepper" vertical>
      <!-- arXiv link & fetch -->
      <v-stepper-step :complete="stepper > 1" step="1">
        arXiv link
        <small>Fetch data from arXiv or choose to fill it manually.</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-text-field
          label="Link to arXiv"
          placeholder="https://arxiv.org/abs/2003.14415"
          :disabled="disabled"
          v-model="paperUrl"
          :error-messages="textfieldErrors.arxivlink"
          class="pb-2"
        ></v-text-field>
        <v-btn
          color="primary"
          :disabled="disabled"
          :loading="arxiv_loading"
          @click="fetchArxiv"
          >fetch</v-btn
        >
        <v-btn text :disabled="disabled" @click="stepper = 2"
          >Fill manually</v-btn
        >
      </v-stepper-content>

      <!-- Fill in fields -->
      <v-stepper-step :complete="stepper > 2" step="2">
        Basic information
        <small>Fill in the basic information.</small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-text-field
          v-model="title"
          label="Title"
          placeholder="Title of the paper"
          :error-messages="textfieldErrors.title"
          @input="textfieldErrors.title = ''"
          :disabled="disabled"
          class="pb-2"
        ></v-text-field>

        <v-text-field
          v-model="authors"
          label="Author(s)"
          placeholder="Mary Smith, John Dee"
          :error-messages="textfieldErrors.authors"
          @input="textfieldErrors.authors = ''"
          :disabled="disabled"
          class="pb-2"
        ></v-text-field>

        <v-textarea
          v-model="summary"
          label="Abstract"
          placeholder="Abstract of the paper"
          :error-messages="textfieldErrors.abstract"
          @input="textfieldErrors.abstract = ''"
          :disabled="disabled"
          class="pb-2"
        ></v-textarea>

        <v-text-field
          v-model="githublink"
          label="Link to GitHub"
          placeholder="https://github.com/pograjak/pubpap"
          :error-messages="textfieldErrors.githublink"
          :disabled="disabled"
          class="pb-2"
        ></v-text-field>

        <v-btn color="primary" @click="checkBasicInfo">Continue</v-btn>
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
        <v-btn color="primary" @click="thumbnailSubmit">{{
          imguploadBtnText
        }}</v-btn>
        <v-btn text @click="stepper = 2">Back</v-btn>
      </v-stepper-content>

      <!-- Online presentation -->
      <v-stepper-step :complete="stepper > 4" step="4">
        Online presentation
        <small>Setup online presentation.</small>
      </v-stepper-step>

      <v-stepper-content step="4">
        <p class="subtitle-2">
          Help others understand your ideas by giving an online presentation!
          <br />The presentation will take place as an interactive online call.
          A recording will be freely available on pubpap.
        </p>
        <v-checkbox
          class="subtitle-2"
          label="Organize an online presentation"
          :disabled="disabled"
          v-model="organizePresentation"
        ></v-checkbox>
        <v-container class="py-0 px-0">
          <v-row>
            <v-col cols="12" md="6" class="pb-0">
              <p class="caption">
                Set the goal for audience size. The presentation will only be
                organized if the number is reached.
              </p>
              <v-slider
                label="Audience goal"
                :disabled="!organizePresentation"
                class="pa-0 ma-0"
                v-model="audienceGoal"
                max="100"
                min="10"
                step="1"
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="audienceGoal"
                    :disabled="!organizePresentation"
                    class="pa-0 ma-0"
                    single-line
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
              </v-slider>
            </v-col>
            <v-col cols="12" md="6" class="pb-0">
              <p class="caption">
                Set the ticket price. Mind that the main goal of ticket purchase
                is to prove real interest in the presentation.
              </p>
              <v-slider
                label="Ticket price"
                :disabled="!organizePresentation"
                class="pa-0 ma-0"
                v-model="bid"
                max="20"
                min="3"
                step="0.5"
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="bid"
                    :disabled="!organizePresentation"
                    class="pa-0 ma-0"
                    single-line
                    type="number"
                    suffix="USD"
                    style="width: 100px"
                  ></v-text-field>
                </template>
              </v-slider>
            </v-col>
          </v-row>
        </v-container>
        <p class="subtitle-2 pb-2">
          Once the audience goal is reached, we will contact you and the guests
          with further details.
        </p>

        <p v-if="submit_error" class="caption mb-0 error--text">
          Error submitting paper.
        </p>
        <v-btn
          :class="{ error: submit_error }"
          :loading="submit_loading"
          color="primary"
          @click="submitPaper"
          >Submit paper</v-btn
        >
        <v-btn text @click="stepper = 3">Back</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="stepper >= 5" step="5">
        Share
        <small>Share the paper page!</small>
      </v-stepper-step>

      <v-stepper-content step="5">
        <h3 class="subtitle-1">Success!</h3>
        <p class="subtitle-2">
          Link to paper page:
          <nuxt-link class="grey--text text--darken-1" :to="newPaperPage">{{
            newPaperURL
          }}</nuxt-link>
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
import Vue from "vue";
import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);

import ImageUpload from "~/components/ImageUpload.vue";

let parseString = require("xml2js").parseString;

export default {
  data() {
    return {
      // Paper informations
      arxLink: "",
      title: "",
      authors: "",
      summary: "",
      githublink: "",
      organizePresentation: true,
      bid: 5,
      audienceGoal: 20,

      // Page essentials
      stepper: 1,
      paperUrl: "",
      disabled: false,
      arxiv_loading: false,
      submit_loading: false,
      submit_error: false,
      newPaperId: "",
      imguploadBtnText: "skip",
      thumbnailObj: null,

      // TODO: remove this dev feature
      currentUrl:
        window.location.hostname == "localhost"
          ? "localhost:3000"
          : window.location.hostname,

      textfieldErrors: {
        arxivlink: "",
        title: "",
        authors: "",
        abstract: "",
        githublink: ""
      }
    };
  },

  computed: {
    newPaperURL() {
      return "http://" + this.currentUrl + "/paper/" + this.newPaperId;
    },
    newPaperPage() {
      return "/paper/" + this.newPaperId;
    }

  },

  components: {
    ImageUpload
  },

  methods: {
    sharePopUp(url) {
      window.open(url, "newwindow", "width=600, height=600");
      return false;
    },
    twitterClick() {
      this.sharePopUp("https://twitter.com/share?url=" + this.newPaperURL);
    },
    async fetchArxiv() {
      if (this.paperUrl.length < 1) {
        this.textfieldErrors.arxivlink =
          'Enter address or click "Fill manually".';
        return;
      }

      this.arxiv_loading = true;
      this.textfieldErrors.arxivlink = "";

      const paperId = /[^/]*$/.exec(this.paperUrl)[0];
      // console.log(paperId);
      const resp = await fetch(
        // `http://export.arxiv.org/api/query?search_query=${paperId}&start=0&max_results=10`
        `http://export.arxiv.org/api/query?id_list=${paperId}&sortBy=lastUpdatedDate&sortOrder=descending
&start=0&max_results=1`
      );

      var data = await resp.text();

      parseString(data, (err, result) => {
        // console.log(err);
        // Fill in variables
        try {
          if (result.feed.entry[0].title[0] == "Error") {
            console.log(result.feed.entry[0]);
            throw "Arxiv responded with error";
          }

          this.title = result.feed.entry[0].title[0]
            .replace(/(\r\n|\n|\r)/gm, " ") // remove newlines & double spaces
            .replace(/\s+/g, " ")
            .trim();
          this.summary = result.feed.entry[0].summary[0]
            .replace(/(\r\n|\n|\r)/gm, " ")
            .replace(/\s+/g, " ")
            .trim();

          var auth_arr = []; // authors
          for (const i in result.feed.entry[0].author) {
            // console.log(result.feed.entry[0].author[i].name);
            auth_arr.push(result.feed.entry[0].author[i].name);
          }
          this.authors = auth_arr.join(", ");
          this.arxLink = result.feed.entry[0].id[0];

          // Control UI
          this.arxiv_loading = false;
          this.stepper = 2;
        } catch (err) {
          console.log(err);
          this.textfieldErrors.arxivlink = "Error loading from arXiv.";
          this.arxiv_loading = false;
        }
      });
    },

    submitPaper() {
      this.submit_error = false;
      this.submit_loading = true;
      this.$fireStore
        .collection("papers")
        .add({
          authorId: this.$fireAuth.currentUser.uid,
          createdAt: this.$fireStoreObj.FieldValue.serverTimestamp(),
          title: this.title,
          authors: this.authors,
          arxLink: this.arxLink,
          summary: this.summary,
          githublink: this.githublink,
          organizePresentation: this.organizePresentation,
          //audienceGoal: this.audienceGoal,
          //bid: this.bid,
          hasImg: this.thumbnailObj != null,
          requestPresentation: {
            goal: this.audienceGoal * this.bid,
            bid: this.bid,
            currentValue: 0,
            audienceGoal: this.audienceGoal,
            subsIds: []
          }
        })
        .then(docRef => {
          this.newPaperId = docRef.id;

          if (this.thumbnailObj != null) {
            const imgName =
              "paper_thumbnails/" +
              this.newPaperId;

            this.$fireStorage
              .ref()
              .child(imgName)
              .putString(this.thumbnailObj.img, "data_url")
              .then(() => {
                console.log("Image uploaded");
                this.stepper = 5;
                this.submit_loading = false;
              })
              .catch(err => {
                this.submit_error = true;
                this.submit_loading = false;
                throw err;
              });
          } else {
            this.stepper = 5;
            this.submit_loading = false;
          }
        })
        .catch(err => {
          this.submit_error = true;
          this.submit_loading = false;
          throw err;
        });
    },

    clearForm() {
      this.stepper = 1;
      this.arxLink = "";
      this.title = "";
      this.authors = "";
      this.summary = "";
      this.githublink = "";
      this.organizePresentation = true;
      this.paperUrl = "";
      this.submit_error = false;
      this.submit_loading = false;
      this.arxiv_loading = false;
      this.imguploadBtnText = "skip";
      this.thumbnailObj = null;
      this.$refs.imageUploader.setupCropper(null);
    },

    checkBasicInfo() {
      // Check the basic infor about paper
      var error = false;
      if (this.title.length < 1) {
        this.textfieldErrors.title = "Required.";
        error = true;
      } else {
        this.textfieldErrors.title = "";
      }

      if (this.authors.length < 1) {
        this.textfieldErrors.authors = "Required.";
        error = true;
      } else {
        this.textfieldErrors.authors = "";
      }

      if (this.summary.length < 1) {
        this.textfieldErrors.abstract = "Required.";
        error = true;
      } else {
        this.textfieldErrors.abstract = "";
      }

      // Regex for github link
      const gitHubRegEx = RegExp(
        "^https://github.com/[a-z0-9](?:-?[a-z0-9]){0,38}/[a-zA-Z0-9-._]+$"
      );

      if ((this.githublink.length > 0) & !gitHubRegEx.test(this.githublink)) {
        this.textfieldErrors.githublink =
          "Required format: https://github.com/[username]/[repository]";
        error = true;
      } else {
        this.textfieldErrors.githublink = "";
      }

      if (!error) {
        this.stepper = 3;
      }
    },

    thumbnailSubmit() {
      const imgobj = this.$refs.imageUploader.getImage();
      if (imgobj != null) {
        this.thumbnailObj = imgobj;
      }

      this.stepper = 4;
    }
  }
};
</script>

<style scoped>
.v-stepper {
  box-shadow: none;
}
</style>
