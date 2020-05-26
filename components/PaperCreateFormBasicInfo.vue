<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="title"
      label="Title"
      placeholder="Title of the paper"
      :disabled="disabled"
      :rules="rules.title"
      class="pb-2"
    ></v-text-field>

    <v-text-field
      v-model="authors"
      label="Author(s)"
      placeholder="Mary Smith, John Dee"
      :disabled="disabled"
      :rules="rules.authors"
      class="pb-2"
    ></v-text-field>

    <v-textarea
      v-model="summary"
      label="Abstract"
      placeholder="Abstract of the paper"
      :disabled="disabled"
      :rules="rules.summary"
      class="pb-2"
    ></v-textarea>

    <v-container class="pa-0">
      <v-row>
        <v-col cols="12" md="6" class="py-0">
          <v-text-field
            v-model="arxLink"
            label="Link to arXiv (optional)"
            placeholder="https://arxiv.org/abs/2003.14415"
            :disabled="disabled"
            :rules="rules.arxLink"
            class="pb-2"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" class="py-0">
          <v-text-field
            v-model="githublink"
            label="Link to GitHub (optional)"
            placeholder="https://github.com/pograjak/pubpap"
            :disabled="disabled"
            :rules="rules.githublink"
            class="pb-2"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
const regexGitHub = RegExp(
  "^(https://github.com/[a-z0-9](?:-?[a-z0-9]){0,38}/[a-zA-Z0-9-._]+)?$"
);
const regexArXiv = RegExp(
  "^(http(s)?://(www.)?arxiv.org/abs/(([0-9]{4}.[0-9]{4,5}([vV][0-9]+)?)|([0-9]{7})))?$"
);

export default {
  data() {
    return {
      title: "",
      authors: "",
      summary: "",
      arxLink: "",
      githublink: "",
      valid: false,
      rules: {
        title: [
          v => !!v || "Title is required",
          v =>
            (v && v.length <= 400) || "Title must be less than 400 characters"
        ],
        authors: [
          v => !!v || "Author(s) is required",
          v =>
            (v && v.length <= 400) ||
            "Author(s) must be less than 400 characters"
        ],
        summary: [
          v => !!v || "Abstract is required",
          v =>
            (v && v.length <= 8000) ||
            "Abstract must be less than 8000 characters"
        ],
        arxLink: [
          v =>
            (v.length == 0) ||
            regexArXiv.test(v) ||
            "Valid arXiv link in format http://arxiv.org/abs/[paperId] required."
        ],
        githublink: [
          v =>
            (v.length == 0) ||
            regexGitHub.test(v) ||
            "Valid GitHub link in format https://github.com/[username]/[repository] required."
        ]
      }
    };
  },

  props: {
    disabled: Boolean
  },

  methods: {
    validate(){
      return this.$refs.form.validate();
    },
    fetch() {
      if (!this.$refs.form.validate()) {
        return null;
      }
      return {
        title: this.title,
        authors: this.authors,
        summary: this.summary,
        arxLink: this.arxLink,
        githublink: this.githublink
      };
    },
    push(da){
      if(da.title) this.title = da.title;
      if(da.authors) this.authors = da.authors;
      if(da.summary) this.summary = da.summary;
      if(da.arxLink) this.arxLink = da.arxLink;
      if(da.githublink) this.githublink = da.githublink;
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>