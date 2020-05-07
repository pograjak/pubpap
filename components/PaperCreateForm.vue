<template>
  <div>
    Hello from paper create form

    <v-text-field
      name="paperUrl"
      label="paperUrl"
      ref="paperUrl"
      v-model="paperUrl"
    ></v-text-field>
    <v-text-field
      name="gitHubUrl"
      label="gitHubUrl"
      ref="gitHubUrl"
      v-model="gitHubUrl"
    ></v-text-field>
    <v-btn color="success" @click="fetchArxiv">fetch data</v-btn>
    <br />
    <br />
    {{ title }}
    <br />
    {{ summary }}
    <br />
    {{ authors }}
    <br />
  </div>
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
      gitHubUrl: ""
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
          summary: this.summary
        });
      console.log(a);
    }
  }
};
</script>

<style scoped></style>
