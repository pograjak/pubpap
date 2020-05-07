<template>
  <v-card class="mx-auto" min-width="500" max-width="1800" outlined>
    <v-list-item three-line>
      <v-list-item-content>
<<<<<<< HEAD
        <v-card-title>
          {{ paper.title }}
        </v-card-title>
        <v-card-subtitle>{{ paper.authors }}</v-card-subtitle>
        <v-card-text class="justify-center">
          {{ paper.summary }}
        </v-card-text>
=======
        <v-card-title
          >Automatic Detection of Coronavirus Disease (COVID-19) Using X-ray
          Images and Deep Convolutional Neural Networks</v-card-title
        >
        <v-card-subtitle>Ali Narin, Ceren Kaya, Ziynet Pamuk</v-card-subtitle>
        <v-card-text class="text-justify"
          >The 2019 novel coronavirus (COVID-19), with a starting point in
          China, has spread rapidly among people living in other countries, and
          is approaching approximately 305,275 cases worldwide according to the
          statistics of European Centre for Disease Prevention and Control.
          There are a limited number of COVID-19 test kits available in
          hospitals due to the increasing cases daily. Therefore, it is
          necessary to implement an automatic detection system as a quick
          alternative diagnosis option to prevent COVID-19 spreading among
          people. In this study, three different convolutional neural network
          based models (ResNet50, InceptionV3 and Inception-ResNetV2) have been
          proposed for the detection of coronavirus pneumonia infected patient
          using chest X-ray radiographs. ROC analyses and confusion matrices by
          these three models are given and analyzed using 5-fold cross
          validation. Considering the performance results obtained, it is seen
          that the pre-trained ResNet50 model provides the highest
          classification performance with 98% accuracy among other two proposed
          models (97% accuracy for InceptionV3 and 87% accuracy for
          Inception-ResNetV2).</v-card-text
        >
>>>>>>> 2455e056b1783c68fe010888ae705275d65f3f2f

        <v-card-actions>
          <v-btn color="white-black">arXiv</v-btn>
          <v-btn color="white-black">arXiv PDF</v-btn>
          <v-btn color="white-black">
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </v-card-actions>
      </v-list-item-content>

      <v-list-item-avatar tile size="300" color="grey">
        <v-img :src="images.paper"></v-img>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      images: {
        paper: require("~/assets/paper.png")
      }
    };
  },

  computed: {
    ...mapGetters({
      paper: "paper/paper"
    })
  },

  created() {
    if (this.$route.params.id) {
      this.$store.dispatch("paper/bindPaper", this.$route.params.id);
    } else {
      this.paper = {
        title: "fck"
      };
    }
  }
};
</script>

<style scoped>
</style>
