<template>
  <v-card>
    <v-card-title>Add your paper</v-card-title>
    <v-card-subtitle
      class="pb-0"
    >Create a new page for your paper by fetching data from arXiv or by entering it manually.</v-card-subtitle>

    <v-list class="py-5">
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
        <v-checkbox label="Organize an online presentation" :disabled="disabled" v-model="organizePresentation"></v-checkbox>
      </v-list-item>

      <v-list-item>
        <v-row>
          <v-col>
            <v-text-field
              name="priceGoal"
              label="How much do you want to collect co organize a meeting?"
              ref="priceGoal"
              :disabled="disabled"
              v-model="priceGoal"
            ></v-text-field>
            <v-slider v-model="priceGoal" :disabled="!organizePresentation" step="1" max="1000"></v-slider>
          </v-col>
          <v-col>
            <v-text-field
              name="bid"
              label="How much do you want to collect from one baker?"
              ref="bid"
              :disabled="disabled"
              v-model="bid"
            ></v-text-field>
            <v-slider v-model="bid" :disabled="disabled" step="1" max="100"></v-slider>
          </v-col>
        </v-row>

        <v-btn color="success" @click="disabled = !disabled">Disable</v-btn>
        <br />
        <br />
        {{ title }}
        <br />
        {{ summary }}
        <br />
        {{ authors }}
        <br />
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
      bid: 10,
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
          console.log(result.feed.entry[0].author[i].name)
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
