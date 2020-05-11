<template>
  <v-card>
    <v-container>
      <v-row no-gutters>
        <v-col>
          <v-card-text class="markdown-body pb-1" v-html="render_markdown(text)"></v-card-text>
          <v-row no-gutters>
            <v-col></v-col>
            <v-col cols="auto">
              <v-row no-gutters>
                <User :date="date" :name="name" :rightAlign="true" />
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import User from "~/components/User.vue";
import { md } from "~/plugins/markdown_render.js";
import "~/assets/own-github-markdown.css";

export default {
  props: {
    text: String,
    date: Object,
    name: String
  },
  components: {
    User
  },

  methods: {
    render_markdown(mkdwn) {
      return md.render(mkdwn);
    }
  }
};
</script>

<style scoped>
.name {
  font-size: 10pt;
  max-height: 20px;
  text-align: right;
  padding-right: 10px;
  line-height: 100%;
  margin: 0;
  margin-bottom: 3px;
}
</style>