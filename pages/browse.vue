<template>
  <div>
    <v-autocomplete
      v-model="authorsSelection"
      :disabled="isUpdating"
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

    <v-container fluid>
      <v-row dense>
        <v-col v-for="paper in papers" :key="paper.paperId" cols="12" sm="4" lg="3">
          <BrowsePaperCard :paper="paper" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import BrowsePaperCard from "~/components/BrowsePaperCard.vue";

export default {
  data() {
    return {
      isUpdating: false,
      authorsSelection: [],
      authors: [
        { name: "Vít Obrusník", uid: "HF1IevqZpMb5isaWIss2NzU2tL93" },
        { name: "Michal Jirku", uid: "48JgC1NZu8fyc1vG4R1mUJXSSyU2" },
        { name: "Tomáš Novák", uid: "EOjs06yMEJavOIK4JhI9lJysq3O2" },
        { name: "Jordan Moravenov", uid: "iG4wCaJ2iPgtQF9DKZiX9ML40Dj1" }
      ],
      papers: []
    };
  },
  components: {
    BrowsePaperCard
  },
  created() {
     this.loadPapers();
  },

  methods: {
    async loadPapers() {
      let pRef = this.$fireStore.collection("papers")
      if(this.authorsSelection.length > 0){
        pRef = pRef.where("authorId", "in", this.authorsSelection)
      }
      pRef = pRef.orderBy("createdAt", "desc").limit(10);

      let p = await pRef.get();
      this.papers = [];
      p.forEach((doc) => {
        let dat = doc.data();
        dat.paperId = doc.id;
        this.papers.push(dat);
      });
    },
    selectAuthors() {
      console.log(this.authorsSelection);
      this.loadPapers();
    },
    remove(item) {
      const index = this.authorsSelection.indexOf(item.uid);
      if (index >= 0) this.authorsSelection.splice(index, 1);
      this.selectAuthors();
    }
  }
};
</script>
