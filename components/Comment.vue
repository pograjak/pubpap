<template>
  <v-card>
    <v-container>
      <v-row no-gutters>
        <v-col>
          <v-card-text>{{ text }}</v-card-text>
          <v-row no-gutters>
            <v-col></v-col>
            <v-col cols="auto">
              <v-row no-gutters>
                <User :date="date" :name="name" :rightAlign="true" />
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import User from "~/components/User.vue";

export default {
  props: {
    text: String,
    date: Number,
    name: String
  },
  components: {
    User
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