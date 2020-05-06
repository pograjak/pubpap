<template>
  <div>
    Hello from paper create form

    <v-text-field
      name="paperUrl"
      label="paperUrl"
      ref="paperUrl"
      v-model="paperUrl"
    ></v-text-field>
    <v-btn color="success" @click="fetchArxiv">fetch data</v-btn>
    <br />
    <br />
    {{ title }}
    <br />
    {{ summary }}
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
      summary: ""
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
        self.title = result.feed.entry[0].title[0];
        self.summary = result.feed.entry[0].summary[0];
      });
    }
  }
};
</script>

<style scoped></style>
