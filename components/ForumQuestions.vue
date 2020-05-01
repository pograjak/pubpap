<template>
  <div>
    Forum here
    <br />
    <button @click="btnClick()">Click</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      text: "Hello first"
    };
  },

  computed: {},

  methods: {
    btnClick() {
      console.log("h");
      this.text = "Hello second";
    }
  }
};
</script>

<style scoped></style>
