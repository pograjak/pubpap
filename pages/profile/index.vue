<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <UserDetail />
      </v-col>
    </v-row>
    <br />
    <v-row>
      <v-col>
        <PaperCreateForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaperCreateForm from "@/components/PaperCreateForm.vue";
import UserDetail from "@/components/UserDetail.vue";

export default {
  middleware: "auth",
  components: {
    PaperCreateForm,
    UserDetail
  }
};
</script>

<style scoped></style>
