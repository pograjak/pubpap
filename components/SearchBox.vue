<template>
  <ais-instant-search
    index-name="papers"
    :search-client="searchClient"
    class="ml-7 d-flex flex-grow-1"
  >
    <v-menu centered max-height="800px" transition="slide-y-transition" offset-y nudge-bottom="2">
      <template v-slot:activator="{ on }">
        <ais-search-box class="d-flex flex-grow-1">
          <!-- v-on:input="refine(textInput)" -->
          <template v-slot="item">
            <v-text-field
              :value="item.currentRefinement"
              v-model="textInput"
              v-on:input="typingText(item.refine)"
              class="mr-3"
              v-on="on"
              placeholder="Search"
              single-line
              hide-details
              append-icon="mdi-magnify"
            ></v-text-field>
          </template>
        </ais-search-box>
      </template>

      <ais-hits>
        <v-list two-line class="py-0" slot-scope="{ items }">
          <v-list-item class="py-0" style="min-height: 40px" v-if="showSearching">
            <v-list-item-content class="py-0 text-center">
              <v-list-item-title>
                <LoadingSpinner />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <template v-if="!showSearching && items.length == 0">
            <v-list-item class="py-0" style="min-height: 40px">
              <v-list-item-content class="py-0 text-center">
                <v-list-item-title>
                  <v-icon>mdi-emoticon-sad-outline</v-icon>&nbsp;No results
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <template v-if="!showSearching">
            <template v-for="item in items">
              <v-list-item
                :key="item.objectID"
                class="py-1"
                style="min-height: 45px"
                @click="textInput = ''"
                :to="'/paper/'+item.objectID"
              >
                <v-list-item-content class="py-0">
                  <v-list-item-title>
                    <ais-highlight :hit="item" attribute="title"></ais-highlight>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <ais-highlight :hit="item" attribute="authors"></ais-highlight>
                  </v-list-item-subtitle>
                  <!-- <v-list-item-subtitle>
                  <ais-snippet :hit="item" attribute="summary"></ais-snippet>
                  </v-list-item-subtitle>-->
                </v-list-item-content>
              </v-list-item>
              <v-divider :key="item.objectID+'_'"></v-divider>
            </template>
          </template>
        </v-list>
      </ais-hits>
    </v-menu>
  </ais-instant-search>
</template>
          

<script>
import Vue from "vue";
import debounce from "lodash/debounce";
import algoliasearch from "algoliasearch/lite";

import InstantSearch from "vue-instantsearch";

import LoadingSpinner from "~/components/LoadingSpinner.vue";
Vue.use(InstantSearch);

let algolia = require("~/plugins/credentials.js").algolia;

const algoliaClient = algoliasearch(algolia.appId, algolia.apiKey);

export default {
  data() {
    return {
      searchClient: null,
      textInput: "",
      showSearching: false
    };
  },
  components: {
    LoadingSpinner
  },
  created() {
    this.searchClient = { search: this.search }; // own search function for proper debounce
  },
  methods: {
    async search(requests) {
      // console.log("Search invoke");
      let hits = await algoliaClient.search(requests);
      this.showSearching = false;
      return hits;
    },
    debounceInput: debounce(
      function(refineFcn) {
        // console.log(`Search: ${this.textInput}`);
        refineFcn(this.textInput);
      },
      800, // debouce delay
      { maxWait: 2000 }
    ),
    typingText(refineFcn) {
      this.showSearching = true;
      if (this.textInput.length > 0) {
        this.debounceInput(refineFcn); // debounce input
      } else {
        refineFcn(this.textInput); // call straight away on empty query
      }
    }
  }
};
</script>

<style scoped>
</style>