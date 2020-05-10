<template>
  <v-card class="pb-1">
    <v-container class="px-4 pt-3 pb-0">
      <v-row no-gutters justify="space-between" align="baseline">
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

    <v-card class="mx-4 mt-2 mb-3" outlined>
      <v-container class="pt-5">
        <v-row v-if="showTitleField" no-gutters>
          <v-col>
            <!-- <v-text-field class="titlefield" label="Add title..." v-model="input_title"></v-text-field> -->
            <input class="titlefield" placeholder="Add title..." />
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
              <v-icon style="line-height: inherit">mdi-language-markdown</v-icon>&nbsp;Styling with
              <a
                class="grey--text"
                href="https://www.markdownguide.org/basic-syntax/"
              >Markdown</a> supported.
            </p>
          </v-col>
          <v-col class="text-right pt-2">
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

      <!-- <v-card-actions class="pa-0 ma-0">
        <v-container class="pr-4">
          <v-row no-gutters></v-row>
        </v-container>
      </v-card-actions>-->
    </v-card>
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
    showTitleField: Boolean,
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
        // {
        //   name: "undo",
        //   action: EasyMDE.undo,
        //   className: "v-icon mdi mdi-undo",
        //   noDisable: true,
        //   title: "Undo"
        // },
        // {
        //   name: "redo",
        //   action: EasyMDE.redo,
        //   className: "v-icon mdi mdi-redo",
        //   noDisable: true,
        //   title: "Redo"
        // },
        // "|",
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
.titlefield {
  width: 100%;
  padding: 5px 14px;
  padding-top: 10px;
  margin-top: 0;
  margin-bottom: 12px;
  border-top: 1px solid #bbb;
  border-left: 1px solid #bbb;
  border-right: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>