<template>
  <v-card class="mt-6">
    <v-container class="px-4 pt-6 pb-3">
      <v-row no-gutters justify="space-between" align="end">
        <v-col>
          <p class="pa-0 ma-0 subtitle-1" style="line-height: 100%">{{ title }}</p>
        </v-col>
        <v-col>
          <p
            class="text-right pa-0 ma-0 caption grey--text text--darken-1"
          >{{ get_deco_username() }}</p>
        </v-col>
      </v-row>
    </v-container>

    <v-card class="mx-4 my-0">
      <v-container>
        <v-row no-gutters>
          <v-col>
            <v-text-field label="Add title..." v-model="input_title"></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <div class="markdown-body">
              <textarea :id="'textarea_'+this._uid"></textarea>
            </div>
          </v-col>
        </v-row>

        <v-row no-gutters class="pt-1">
          <v-col>
            <p class="grey--text ma-0 pa-0 caption">
              <v-icon style="line-height: inherit">mdi-language-markdown</v-icon> Format with
              <a class="grey--text" href="https://www.markdownguide.org/basic-syntax/">Markdown</a>
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card-actions class="pa-0 ma-0">
      <v-container class="pr-4">
        <v-row no-gutters>
          <v-col class="text-right">
            <v-btn color="secondary">Cancel</v-btn>
            <v-btn
              :disabled="user.email == ''"
              class="ml-2 white--text button_right"
              color="blue accent-4"
              @click="addComment"
            >Submit</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>


<script>
// import VueSimplemde from "vue-simplemde";
// import "simplemde/dist/simplemde.min.css";
// import "github-markdown-css";

import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import { md } from "~/plugins/markdown_render.js";
import "~/assets/own-github-markdown.css";

export default {
  props: {
    title: String,
    threadId: String,
    user: Object
  },
  //   components: { VueSimplemde },
  data() {
    return {
      easyMDE: null,
      input_title: ""
    };
  },
  mounted() {
    this.easyMDE = new EasyMDE({
      element: document.getElementById("textarea_" + this._uid),
      previewRender: function(plainText) {
        return md.render(plainText); // Returns HTML from a custom parser
      },
      autoDownloadFontAwesome: false,
      hideIcons: ["image", "side-by-side", "fullscreen"],
      indentWithTabs: false,
      lineWrapping: false,
      placeholder: this.title + "...",
      spellChecker: false,
      status: false,
      styleSelectedText: false,
      toolbar: [
        {
          name: "heading",
          action: EasyMDE.toggleHeading3,
          className: "v-icon mdi mdi-format-header-3",
          title: "Heading"
        },
        {
          name: "bold",
          action: EasyMDE.toggleBold,
          className: "v-icon mdi mdi-format-bold",
          title: "Bold"
        },
        {
          name: "italic",
          action: EasyMDE.toggleItalic,
          className: "v-icon mdi mdi-format-italic",
          title: "Italic"
        },

        "|",
        {
          name: "undo",
          action: EasyMDE.undo,
          className: "v-icon mdi mdi-undo",
          noDisable: true,
          title: "Undo"
        },
        {
          name: "redo",
          action: EasyMDE.redo,
          className: "v-icon mdi mdi-redo",
          noDisable: true,
          title: "Redo"
        },
        "|",
        {
          name: "code",
          action: EasyMDE.toggleCodeBlock,
          className: "v-icon mdi mdi-code-tags",
          title: "Code"
        },
        {
          name: "quote",
          action: EasyMDE.toggleBlockquote,
          className: "v-icon mdi mdi-format-quote-close",
          title: "Quote"
        },
        {
          name: "link",
          action: EasyMDE.drawLink,
          className: "v-icon mdi mdi-link",
          title: "Create Link"
        },
        "|",
        {
          name: "unordered-list",
          action: EasyMDE.toggleUnorderedList,
          className: "v-icon mdi mdi-format-list-bulleted",
          title: "Generic List"
        },
        {
          name: "ordered-list",
          action: EasyMDE.toggleOrderedList,
          className: "v-icon mdi mdi-format-list-numbered",
          title: "Numbered List"
        },
        "|",
        {
          name: "preview",
          action: EasyMDE.togglePreview,
          className: "v-icon mdi mdi-eye",
          title: "Toggle Preview",
          noDisable: true
        },
        "|",
        {
          name: "guide",
          action: "https://www.markdownguide.org/basic-syntax/",
          className: "v-icon mdi mdi-information-variant",
          title: "Numbered List"
        }
      ]
    });
  },

  methods: {
    get_deco_username() {
      if (this.user.email == "") {
        return "Not logged in";
      } else {
        return `Submitting as ${this.user.email}`;
      }
    },
    addComment() {
      if (this.easyMDE != null) {
        var text = this.easyMDE.value();
        if (text.length > 0) {
          this.$store.dispatch("threads/addComment", {
            threadId: this.threadId,
            text: text,
            userName: this.user.email
          });
          this.easyMDE.value("");
        }
      }
    }
  }
};
</script>

<style scoped>
</style>