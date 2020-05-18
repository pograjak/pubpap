<template>
  <div>
    <PaperList class="my-6" v-if="this.$fireAuth.currentUser" />
    <RecentPapers class="mb-6 mt-12"/>
  </div>
</template>

<script>
import PaperList from "~/components/PaperList.vue";
import RecentPapers from "~/components/RecentPapers.vue";
export default {
  components: { PaperList, RecentPapers }
};
</script>

<style></style>
