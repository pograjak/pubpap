<template>
  <v-card class="pt-3 pb-4 px-4">
    <v-container class="px-4 pt-3 pb-0">
      <!-- Title -->
      <v-row class="pb-2" no-gutters justify="space-between" align="baseline">
        <v-col>
          <p class="pa-0 ma-0 subtitle-1" style="line-height: 100%">{{ title }}</p>
        </v-col>
        <v-col>
          <p
            class="text-right pa-0 ma-0 caption grey--text text--darken-1"
          >{{ get_deco_username() }}</p>
        </v-col>
      </v-row>

      <!-- Title field -->
      <v-row v-if="showTitleField" no-gutters>
        <v-col>
          <input
            v-model="titleValue"
            :disabled="isDisabled"
            class="titlefield"
            :placeholder="isDisabled ? disabledPlaceholder : 'Add title...'"
          />
        </v-col>
      </v-row>

      <!-- Textarea -->
      <v-row no-gutters>
        <v-col>
          <div style="position: relative">
            <div :style="{visibility: isDisabled ? 'hidden' : 'visible'}" class="markdown-body">
              <textarea :id="'textarea_'+this._uid"></textarea>
            </div>
            <div
              v-if="isDisabled"
              style="position: absolute; top:0; left:0; width: 100%; height: 100%"
            >
              <textarea
                class="pa-3"
                style="background-color: #e0e0e0; width: 100%; height: 100%"
                :placeholder="showTitleField ? '' : disabledPlaceholder"
                disabled
              ></textarea>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Markdown note and Buttons -->
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
          <v-btn
            v-if="showCancelButton"
            :class="{
              'primary': isDisabled,
              'secondary': !isDisabled
            }"
            @click="cancel_click"
          >Cancel</v-btn>
          <v-btn
            :disabled="isDisabled"
            v-show="!(isDisabled & showCancelButton)"
            class="ml-2"
            color="primary"
            :loading="submitShowLoading"
            @click="submit_click"
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
import "~/assets/own-github-markdown.css";

export default {
  props: {
    title: String,
    user: Object,
    isDisabled: Boolean,
    showTitleField: Boolean,
    showCancelButton: Boolean,
    disabledPlaceholder: String,
    submitShowLoading: Boolean
  },
  data() {
    return {
      easyMDE: null,
      titleValue: ""
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
    new Promise(r => setTimeout(r, 500)).then(() => {
      this.easyMDE.codemirror.refresh();  // Refresh after all animations are finished.
    });
  },

  methods: {
    cancel_click() {
      this.$emit("cancel");
    },
    submit_click() {
      if (this.easyMDE != null) {
        this.$emit("submit", {
          title: this.titleValue,
          text: this.easyMDE.value()
        });
      }
    },
    clear() {
      this.titleValue = "";
      this.easyMDE.value("");
    },
    get_deco_username() {
      if (this.user.email == "") {
        return "Not logged in";
      } else {
        return `Submitting as ${this.user.email}`;
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
.titlefield:disabled {
  background-color: #e0e0e0;
}
</style>