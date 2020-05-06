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
    {{ data }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      paperUrl: "",
      data: ""
    };
  },

  methods: {
    async fetchArxiv() {
      const paperId = /[^/]*$/.exec(this.paperUrl)[0];

      const resp = await fetch(
        `http://export.arxiv.org/api/query?search_query=${paperId}&start=0&max_results=10`
      );

      this.data = await resp.text();
    }
  }
};
</script>

<style scoped></style>
