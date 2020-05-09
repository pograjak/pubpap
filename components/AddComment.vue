<template>
  <v-card>
    <v-container>
      <v-row no-gutters justify="center">
        <v-col>
          <div>
            <v-row no-gutters>
              <v-col align="left">
                <v-card-title>Comment</v-card-title>
              </v-col>
              <v-col align="end" justify="end">
                <v-card-subtitle>
                  {{
                  get_deco_username()
                  }}
                </v-card-subtitle>
              </v-col>
            </v-row>
            <!-- <vue-simplemde v-model="reply" ref="markdownEditor" preview-class="markdown-body" :configs="editor_configs" /> -->
            <!-- <v-textarea :disabled="user.email == ''" filled v-model="reply"></v-textarea> -->
            <textarea :id="'textarea_'+threadId" v-model="reply"></textarea>
            <v-btn
              :disabled="user.email == ''"
              class="white--text button_right"
              color="blue accent-4"
              @click="addComment"
            >Submit</v-btn>
          </div>
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

export default {
  props: {
    threadId: String,
    user: Object
  },
  //   components: { VueSimplemde },
  data() {
    return {
      reply: "" //'v-icon mdi mdi-account'
      //   editor_configs: {
      //     autofocus: false,
      //     hideIcons: ["image", "side-by-side", "fullscreen"],
      //     indentWithTabs: false,
      //     lineWrapping: false,
      //     placeholder: "Add comment...",
      //     renderingConfig: {
      //       singleLineBreaks: false,
      //       codeSyntaxHighlighting: false
      //     },
      //     spellChecker: false,
      //     status: false,
      //     styleSelectedText: false,
      //     tabSize: 2,
      //   }
    };
  },
  mounted() {
    var easyMDE = new EasyMDE({
      element: document.getElementById("textarea_" + this.threadId),
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
        {
          name: "heading",
          action: EasyMDE.toggleHeadingSmaller,
          className: "v-icon mdi mdi-format-header-increase",
          title: "Heading"
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
          name: "link",
          action: EasyMDE.drawLink,
          className: "v-icon mdi mdi-link",
          title: "Create Link"
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
      this.$store.dispatch("threads/addComment", {
        threadId: this.threadId,
        text: this.reply,
        userName: this.user.email
      });
      this.reply = "";
    }
  }
};
</script>

<style scoped>
</style>