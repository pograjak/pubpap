<template>
  <v-col cols="auto">
    <v-row dense>
      <!-- <v-col cols="1"> -->
        <!-- <v-icon>mdi-account</v-icon> -->
      <!-- </v-col> -->
      <v-col>
        <p class="name">
          {{ name }}
          <br />
          <small>Created {{ date | format-timestamp }}</small>
        </p>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  props: {
    date: Number,
    name: String
  },
  methods: {
  }

};
</script>

<style scoped>


.name {
  font-size: 10pt;
  max-height: 20px;
  text-align: right;
  padding-right: 10px;
  line-height: 100%;
  margin: 0;
  margin-bottom: 3px;
}
</style>