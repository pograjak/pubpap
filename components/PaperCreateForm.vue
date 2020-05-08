<template>
  <v-card>
    <v-card-title primary-title>
      Create new page for your awesome paper:
    </v-card-title>
    <v-card-text>
      <div>
        <v-text-field
          name="paperUrl"
          label="arxiv paper link"
          ref="paperUrl"
          :disabled="disabled"
          v-model="paperUrl"
        ></v-text-field>
        <v-text-field
          name="gitHubUrl"
          label="git hub repo link"
          ref="gitHubUrl"
          :disabled="disabled"
          v-model="gitHubUrl"
        ></v-text-field>
        <v-row>
          <v-col>
            <v-text-field
              name="priceGoal"
              label="How much do you want to collect co organize a meeting?"
              ref="priceGoal"
              :disabled="disabled"
              v-model="priceGoal"
            ></v-text-field>
            <v-slider
              v-model="priceGoal"
              :disabled="disabled"
              step="1"
              max="1000"
            ></v-slider>
          </v-col>
          <v-col>
            <v-text-field
              name="bid"
              label="How much do you want to collect from one baker?"
              ref="bid"
              :disabled="disabled"
              v-model="bid"
            ></v-text-field>
            <v-slider
              v-model="bid"
              :disabled="disabled"
              step="1"
              max="100"
            ></v-slider>
          </v-col>
        </v-row>

        <v-btn color="success" @click="fetchArxiv">fetch data</v-btn>

        <v-btn color="success" @click="disabled = !disabled">Disable</v-btn>
        <br />
        <br />
        {{ title }}
        <br />
        {{ summary }}
        <br />
        {{ authors }}
        <br />
      </div>
    </v-card-text>
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
      bid: 10,
      disabled: false
    };
  },

  methods: {
    async fetchArxiv() {
      const paperId = /[^/]*$/.exec(this.paperUrl)[0];

      const resp = await fetch(
        `http://export.arxiv.org/api/query?search_query=${paperId}&start=0&max_results=10`
      );

      this.data = await resp.text();
      let self = this;
      parseString(this.data, function(err, result) {
        console.log(result.feed.entry[0]);
        self.title = result.feed.entry[0].title[0];
        self.summary = result.feed.entry[0].summary[0];
        self.authors = result.feed.entry[0].author;
        self.arxLink = result.feed.entry[0].id;
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
