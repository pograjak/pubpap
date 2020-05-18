<template>
  <div>
    <div v-if="!user.id" class="headline mb-6">
      Welcome! Check
      <nuxt-link class="black--text" to="/about">info about pubpap.</nuxt-link>
    </div>

    <PaperListContainer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PaperListContainer from "~/components/PaperListContainer.vue";

export default {
  components: { PaperListContainer },
   computed: {
    ...mapGetters(["user"])
  },
};
</script>

<style></style>
