<template>
  <v-card>
    <v-card-title>Add your paper</v-card-title>
    <v-card-subtitle
      class="pb-0"
    >Create a new page for your paper by fetching data from arXiv or by entering it manually.</v-card-subtitle>

    <v-list class="pt-5 pb-0">
      <v-list-item>
        <v-text-field
          name="paperUrl"
          label="Link to arXiv"
          placeholder="https://arxiv.org/abs/2003.14415"
          ref="paperUrl"
          :disabled="disabled"
          v-model="paperUrl"
        >
          <template v-slot:append-outer>
            <v-btn color="primary" :disabled="disabled" @click="fetchArxiv">fetch data</v-btn>
          </template>
        </v-text-field>
      </v-list-item>

      <v-divider></v-divider>

      <v-card-subtitle>Basic information</v-card-subtitle>

      <v-list-item>
        <v-text-field
          v-model="title"
          required
          label="Title"
          placeholder="Title of the paper"
          :disabled="disabled"
        ></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field
          v-model="authors"
          required
          label="Author(s)"
          placeholder="Mary Smith, John Dee"
          :disabled="disabled"
        ></v-text-field>
      </v-list-item>

      <v-list-item class="py-0">
        <v-textarea
          v-model="summary"
          label="Abstract"
          placeholder="Abstract of the paper"
          :disabled="disabled"
        ></v-textarea>
      </v-list-item>

      <v-list-item class="py-0">
        <v-text-field
          name="gitHubUrl"
          ref="gitHubUrl"
          v-model="gitHubUrl"
          label="Link to GitHub"
          placeholder="https://github.com/pograjak/pubpap"
          :disabled="disabled"
        ></v-text-field>
      </v-list-item>

      <v-divider></v-divider>

      <!-- <v-card-subtitle>Paper presentation</v-card-subtitle> -->

      <v-list-item>
        <v-checkbox
          label="Organize an online presentation"
          :disabled="disabled"
          v-model="organizePresentation"
        ></v-checkbox>
      </v-list-item>

      <v-list-item class="py-0">
        <v-container class="pa-0 ma-0">
          <v-row>
            <v-col cols="12" md="6">
              <p
                class="caption"
              >Set the goal for audience size. The presentation will only be organized if the number is reached.</p>
              <v-slider
                label="Audience goal"
                :disabled="(disabled | (!organizePresentation))"
                class="pa-0 ma-0"
                v-model="audienceSize"
                max="100"
                min="10"
                step="1"
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="audienceSize"
                    class="pa-0 ma-0"
                    :disabled="(disabled | (!organizePresentation))"
                    single-line
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
              </v-slider>
            </v-col>
            <v-col cols="12" md="6">
              <p
                class="caption"
              >Set the ticket price. The main goal of ticket purchase is to prove real interest in the presentation.</p>
              <v-slider
                label="Ticket price"
                :disabled="(disabled | (!organizePresentation))"
                class="pa-0 ma-0"
                v-model="bid"
                max="20"
                min="3"
                step="0.5"
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="bid"
                    class="pa-0 ma-0"
                    :disabled="(disabled | (!organizePresentation))"
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
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content align-center>
          <div class="text-right py-2">
            <v-btn color="secondary" @click="disabled = !disabled">Clear</v-btn>
            <v-btn class="ml-2" color="primary" @click="disabled = !disabled">Submit</v-btn>
          </div>
        </v-list-item-content>
        <!-- <v-container>
          <v-row no-gutters>
            <v-col>
              <v-row justify="end">
               
              </v-row>
            </v-col>
          </v-row>
        </v-container>-->
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
let parseString = require("xml2js").parseString;

export default {
  data() {
    return {
      paperUrl: "",
      data: "",
      title: "",
      summary: "",
      authors: "",
      arxLink: "",
      gitHubUrl: "",
      priceGoal: 100,
      audienceSize: 20,
      bid: 5,
      disabled: false,
      organizePresentation: true
    };
  },

  methods: {
    async fetchArxiv() {
      const paperId = /[^/]*$/.exec(this.paperUrl)[0];

      const resp = await fetch(
        // `http://export.arxiv.org/api/query?search_query=${paperId}&start=0&max_results=10`
        `http://export.arxiv.org/api/query?id_list=${paperId}&sortBy=lastUpdatedDate&sortOrder=descending
&start=0&max_results=1`
      );

      this.data = await resp.text();

      parseString(this.data, (err, result) => {
        console.log(result.feed.entry[0]);
        this.title = result.feed.entry[0].title[0]
          .replace(/(\r\n|\n|\r)/gm, " ") // remove newlines & double spaces
          .replace(/\s+/g, " ")
          .trim();
        this.summary = result.feed.entry[0].summary[0]
          .replace(/(\r\n|\n|\r)/gm, " ")
          .replace(/\s+/g, " ")
          .trim();

        var auth_arr = [];
        for (const i in result.feed.entry[0].author) {
          console.log(result.feed.entry[0].author[i].name);
          auth_arr.push(result.feed.entry[0].author[i].name);
        }
        this.authors = auth_arr.join(", ");
        // this.authors = ;
        this.arxLink = result.feed.entry[0].id;
      });
    },

    async createPaper() {
      let a = await this.$fireStore
        .collection("papers")
        .doc()
        .set({
          authorId: this.$fireAuth.currentUser.uid,
          title: this.title,
          authors: this.authors,
          arxLink: this.arxLink,
          summary: this.summary,
          priceGoal: this.priceGoal,
          bid: this.bid
        });
      console.log(a);
    }
  }
};
</script>

<style scoped></style>
