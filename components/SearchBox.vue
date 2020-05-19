<template>
  <ais-instant-search index-name="papers" :search-client="searchClient" class="ml-7 d-flex flex-grow-1">
    <v-menu centered max-height="800px" transition="slide-y-transition" offset-y nudge-bottom="2">
      <template v-slot:activator="{ on }">
        <ais-search-box class="d-flex flex-grow-1">
          <template slot="default" slot-scope="{ currentRefinement, isSearchStalled, refine }">
            <v-text-field
              :value="currentRefinement"
              v-model="textInput"
              v-on:input="refine(textInput)"
              class="mr-3"
              v-on="on"
              placeholder="Search"
              single-line
              hide-details
              append-icon="mdi-text-box-search-outline"
            ></v-text-field>
          </template>
        </ais-search-box>
      </template>

      <ais-hits>
        <v-list two-line class="py-0" slot-scope="{ items }">
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
        </v-list>
      </ais-hits>
    </v-menu>
  </ais-instant-search>
</template>
          

<script>
import Vue from "vue";
import algoliasearch from "algoliasearch/lite";

import InstantSearch from "vue-instantsearch";
Vue.use(InstantSearch);

let algolia = require("~/plugins/credentials.js").algolia;

export default {
  data() {
    return {
      searchClient: algoliasearch(algolia.appId, algolia.apiKey),
      textInput: ""
    };
  }
};
</script>

<style scoped>
</style>