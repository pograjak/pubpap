<template>
  <v-card
    class="mx-auto"
    min-width="1800"
    max-width="1800"
    outlined
  >
  <v-card-title>
    Automatic Detection of Coronavirus Disease (COVID-19) Using X-ray Images and Deep Convolutional Neural Networks
  </v-card-title>

  <v-card-subtitle>
    Ali Narin, Ceren Kaya, Ziynet Pamuk
  </v-card-subtitle>

  <v-card-text>
     The 2019 novel coronavirus (COVID-19), with a starting point in China, has spread rapidly among people living in other countries, and is approaching approximately 305,275 cases worldwide according to the statistics of European Centre for Disease Prevention and Control. There are a limited number of COVID-19 test kits available in hospitals due to the increasing cases daily. Therefore, it is necessary to implement an automatic detection system as a quick alternative diagnosis option to prevent COVID-19 spreading among people. In this study, three different convolutional neural network based models (ResNet50, InceptionV3 and Inception-ResNetV2) have been proposed for the detection of coronavirus pneumonia infected patient using chest X-ray radiographs. ROC analyses and confusion matrices by these three models are given and analyzed using 5-fold cross validation. Considering the performance results obtained, it is seen that the pre-trained ResNet50 model provides the highest classification performance with 98% accuracy among other two proposed models (97% accuracy for InceptionV3 and 87% accuracy for Inception-ResNetV2). 
  </v-card-text>
<!-- 
  <img src="~/assets/paper.png" alt=""> -->
  

 <v-avatar>
   <v-img src="~/assets/paper.png"></v-img>
 </v-avatar>


    <!-- <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">OVERLINE</div>
        <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item> -->

    <!-- <v-card-actions>
      <v-btn text>Button</v-btn>
      <v-btn text>Button</v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
export default {};
</script>

<style scoped></style>
