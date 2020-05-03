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
          <small>Created {{ format_timestamp(date) }}</small>
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
format_timestamp(stamp) {
      const d = new Date(stamp);
      const dtf = new Intl.DateTimeFormat("en", {
        year: "2-digit",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      const [
        { value: mo },,
        { value: da },,
        { value: ye },,
        { value: hou },,
        { value: min },,

      ] = dtf.formatToParts(d);
      return `${mo} ${da}'${ye} at ${hou}:${min}`
    }
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