<template>
  <div>
    <v-row>
      <v-card>
        <UserDetail />
      </v-card>
    </v-row>
    <v-row>
      <PaperCreateForm />
    </v-row>
  </div>
</template>

<script>
import PaperCreateForm from "@/components/PaperCreateForm.vue";
import UserDetail from "@/components/UserDetail.vue";

export default {
  components: {
    PaperCreateForm,
    UserDetail
  }
};
</script>

<style scoped></style>
