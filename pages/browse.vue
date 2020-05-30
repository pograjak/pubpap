<template>
  <div>
    <!-- Authors selection -->
    <v-autocomplete
      v-model="authorsSelection"
      :items="authors"
      chips
      label="Select authors"
      item-text="name"
      item-value="uid"
      multiple
      @change="selectAuthors"
    >
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @click="data.select"
          @click:close="remove(data.item)"
        >
          <!-- <v-avatar left>
            <v-img :src="data.item.avatar"></v-img>
          </v-avatar>-->
          {{ data.item.name }}
        </v-chip>
      </template>
      <template v-slot:item="data">
        <!-- <v-list-item-avatar>
            <img :src="data.item.avatar" />
        </v-list-item-avatar>-->
        <v-list-item-content>
          <v-list-item-title v-html="data.item.name"></v-list-item-title>
        </v-list-item-content>
      </template>
    </v-autocomplete>

    <!-- Cards grid -->
    <v-container fluid>
      <v-row dense>
        <v-col v-for="paper in papers" :key="paper.paperId" cols="12" sm="6" md="4" lg="3" xl="2">
          <BrowsePaperCard :paper="paper" :showLoading="cardsLoading" />
        </v-col>
      </v-row>
    </v-container>
    <div class="d-flex justify-center mt-6">
      <v-btn
        outlined
        :disabled="cardsLoading || noMoreCards"
        :loading="loadingMore"
        @click="loadMore"
      >
        <v-icon small>mdi-plus</v-icon>&nbsp;Load more
      </v-btn>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import BrowsePaperCard from "~/components/BrowsePaperCard.vue";

export default {
  data() {
    return {
      cardsLoading: false,
      loadingMore: false,
      noMoreCards: false,
      authorsSelection: [],
      authors: [
        { name: "Vít Obrusník", uid: "HF1IevqZpMb5isaWIss2NzU2tL93" },
        { name: "Michal Jirku", uid: "48JgC1NZu8fyc1vG4R1mUJXSSyU2" },
        { name: "Tomáš Novák", uid: "EOjs06yMEJavOIK4JhI9lJysq3O2" },
        { name: "Jordan Moravenov", uid: "iG4wCaJ2iPgtQF9DKZiX9ML40Dj1" }
      ],
      papers: [],
      lastPaperObj: null,
      currentQuery: null
    };
  },
  components: {
    BrowsePaperCard
  },
  created() {
    this.cardsLoading = true;
    this.papers = [];
    this.loadPapers();
  },

  computed: {
    gridCols() {
      // compute how many columns does the card grid have
      if (this.$vuetify.breakpoint.xl) {
        return 6;
      } else if (this.$vuetify.breakpoint.lgAndUp) {
        return 4;
      } else if (this.$vuetify.breakpoint.mdAndUp) {
        return 3;
      } else if (this.$vuetify.breakpoint.smAndUp) {
        return 2;
      } else {
        return 1;
      }
    }
  },

  methods: {
    // TODO: move this to store
    async loadPapers() {
      if (this.papers.length == 0) {
        this.papers = Array(this.gridCols).fill({}); // show one row of empty loading cards
      }

      this.cardsLoading = true;
      this.noMoreCards = false;

      this.currentQuery = this.$fireStore.collection("papers"); // compose the query
      if (this.authorsSelection.length > 0) {
        // if no authors are selected, all of them are
        this.currentQuery = this.currentQuery.where(
          "authorId",
          "in",
          this.authorsSelection
        );
      }
      this.currentQuery = this.currentQuery
        .orderBy("createdAt", "desc")
        .limit(this.gridCols);
      let p = await this.currentQuery.get();

      this.papers = [];
      p.forEach(doc => {
        let dat = doc.data();
        dat.paperId = doc.id;
        this.papers.push(dat);
        this.lastPaperObj = doc; // save last object for pagination
      });

      if (p.size < this.gridCols) {
        // disable "Load more" button if not returned queried size
        this.noMoreCards = true;
      }

      this.cardsLoading = false;
    },

    async loadMore() {
      this.loadingMore = true;

      let p = await this.currentQuery
        .startAfter(this.lastPaperObj)
        .limit(this.gridCols)
        .get();

      p.forEach(doc => {
        let dat = doc.data();
        dat.paperId = doc.id;
        this.papers.push(dat);
        this.lastPaperObj = doc; // save last object for pagination
      });

      console.log(p);

      if (p.size < this.gridCols) {
        // disable "Load more" button if not returned queried size
        this.noMoreCards = true;
      }

      this.loadingMore = false;
    },

    // Authors selection
    selectAuthors() {
      console.log(this.authorsSelection);
      this.loadPapers();
    },
    remove(item) {
      const index = this.authorsSelection.indexOf(item.uid);
      if (index >= 0) this.authorsSelection.splice(index, 1);
      this.selectAuthors(); // have to call this here, becase this does not induce @change event
    }
  }
};
</script>
