<template>
  <div>
    <h1>Request online presentation</h1>

    <v-progress-linear color="#D4AF37" height="60" value="78" striped>
      <strong>$156 / $200 Goal</strong>
    </v-progress-linear>
    <br />
    <v-btn color="#D4AF37">Add me ($1)</v-btn>

    <GChart type="PieChart" :data="chartData" :options="chartOptions" />
    <div>
      <v-btn color="success" @click="payment()">Donate me coffe</v-btn>
    </div>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";

export default {
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ["User type", "Votes"],
        ["PhD", 76],
        ["Profs", 5],
        ["Postdoc", 17],
        ["Other", 58]
      ],
      chartOptions: {
        chart: {
          title: "Votes",
          subtitle: "-"
        }
      }
    };
  },

  computed: {},

  methods: {
    async payment() {
      console.log("Peyment starts");

      const session = await fetch(
        "https://europe-west1-pubpap-redcute.cloudfunctions.net/payment"
      );

      const sessionIdc = await session.json();

      console.log(`Session: ${sessionIdc}`);

      const stripe = await loadStripe(
        "pk_test_WNZA8yZsjGbAEFC0pDAb1UrF00BJUKByPR"
      );

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionIdc.id
      });
    }
  }
};
</script>

<style scoped></style>
