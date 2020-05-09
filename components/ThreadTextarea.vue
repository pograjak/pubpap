<template>
  <v-card>
    <v-container>
      <v-row no-gutters justify="space-between" align="end">
        <v-col>
          <v-card-title class="pt-0 pb-1 pt-2 pl-1">{{ title }}</v-card-title>
        </v-col>
        <v-col>
          <p class="name text-right pb-2 pr-0 grey--text text--darken-1">
            {{ get_deco_username() }}
          </p>
        </v-col>
      </v-row>
      <!-- <vue-simplemde v-model="reply" ref="markdownEditor" preview-class="markdown-body" :configs="editor_configs" /> -->
      <!-- <v-textarea :disabled="user.email == ''" filled v-model="reply"></v-textarea> -->
      <v-row no-gutters>
        <v-col>
          <div class="markdown-body">
            <textarea :id="'textarea_'+threadId"></textarea>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-right">
          <v-btn
            :disabled="user.email == ''"
            class="white--text button_right"
            color="blue accent-4"
            @click="addComment"
          >Submit</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>


<script>
// import VueSimplemde from "vue-simplemde";
// import "simplemde/dist/simplemde.min.css";
// import "github-markdown-css";

import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import { md } from "~/plugins/markdown_render.js";
import "github-markdown-css/github-markdown.css";

export default {
  props: {
    title: String,
    threadId: String,
    user: Object
  },
  //   components: { VueSimplemde },
  data() {
    return {
      easyMDE: null
    };
  },
  mounted() {
    this.easyMDE = new EasyMDE({
      element: document.getElementById("textarea_" + this.threadId),
      previewRender: function(plainText) {
        return md.render(plainText); // Returns HTML from a custom parser
      },
      autoDownloadFontAwesome: false,
      hideIcons: ["image", "side-by-side", "fullscreen"],
      indentWithTabs: false,
      lineWrapping: false,
      placeholder: "Add comment...",
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
        return `Logged in as ${this.user.email}`;
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
.name {
  font-size: 10pt;
  max-height: 20px;
  padding-right: 10px;
  line-height: 100%;
  margin: 0;
  margin-bottom: 3px;
}
</style>