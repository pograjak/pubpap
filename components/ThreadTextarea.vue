<template>
  <v-card class="pt-2 pb-3 px-4" outlined>
    <v-container class="px-4 pt-3 pb-0">
      <!-- Title -->
      <v-row class="pb-2" no-gutters justify="space-between" align="baseline">
        <v-col>
          <p class="pa-0 ma-0 subtitle-1" style="line-height: 100%">{{ title }}</p>
        </v-col>
        <v-col>
          <p class="text-right pa-0 ma-0 caption grey--text text--darken-1">{{ decoratedUsername }}</p>
        </v-col>
      </v-row>

      <!-- Title field -->
      <v-row class="my-0" v-if="showTitleField" no-gutters>
        <v-col>
          <!-- <input
            v-model="titleValue"
            :disabled="isDisabled"
            class="titlefield"
            required
            :placeholder="isDisabled ? disabledPlaceholder : 'Add title...'"
          />-->
          <v-text-field
            outlined
            v-model="titleValue"
            class="mb-n4 mt-2"
            label="Title"
            :disabled="isDisabled"
            :error-messages="titleError"
            :placeholder="isDisabled ? disabledPlaceholder : 'Add title...'"
            @input="titleError = ''"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Textarea -->
      <v-row no-gutters>
        <v-col>
          <p
            v-if="textEmptyError"
            style="margin-top: -20px !important"
            class="error--text caption ma-0 pa-0"
          >Add text</p>
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
            text
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
import { mapGetters } from "vuex";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import { md } from "~/plugins/markdown_render.js";
import "~/assets/own-github-markdown.css";

export default {
  props: {
    title: String,
    isDisabled: Boolean,
    showTitleField: Boolean,
    showCancelButton: Boolean,
    disabledPlaceholder: String,
    submitShowLoading: Boolean
  },
  data() {
    return {
      easyMDE: null,
      titleValue: "",
      titleError: "",
      textEmptyError: false
    };
  },
  mounted() {
    this.easyMDE = new EasyMDE({
      element: document.getElementById("textarea_" + this._uid),
      previewRender: function(plainText) {
        return md.render(plainText); // Returns HTML from a custom parser
      },
      autoDownloadFontAwesome: false,
      hideIcons: ["side-by-side", "fullscreen"],
      indentWithTabs: false,
      lineWrapping: true,
      placeholder: this.showTitleField ? "" : this.title + "...",
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
        {
          name: "link",
          action: EasyMDE.drawImage,
          className: "v-icon mdi mdi-image",
          title: "Insert image"
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
      this.easyMDE.codemirror.refresh(); // Refresh after all animations are finished.
    });
  },

  computed: {
    ...mapGetters(["user"]),
    decoratedUsername() {
      if (this.user.id) {
        return `Submitting as ${this.user.displayName}`;
      } else {
        return "Not logged in";
      }
    }
  },

  methods: {
    cancel_click() {
      this.$emit("cancel");
    },
    submit_click() {
      this.titleError = "";
      this.textEmptyError = false;

      if (this.showTitleField & (this.titleValue.length < 1)) {
        this.titleError = "Enter title";
        return;
      }

      if ((this.easyMDE != null) & (this.easyMDE.value().length < 1)) {
        this.textEmptyError = true;
        return;
      }

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
    }
  }
};
</script>

<style scoped>
/* .titlefield {
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
} */
</style>