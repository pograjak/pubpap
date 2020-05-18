<template>
  <div>
    <PaperList />
    <RecentPapers />
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
