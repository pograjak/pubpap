<template>
  <div>
    <div class="headline">Request online presentation</div>
    <v-progress-linear
      color="#D4AF37"
      height="60"
      :value="(request.requestCurrent / request.requestGoal) * 100"
      striped
    >
      <strong>
        ${{ request.requestCurrent }} / ${{ request.requestGoal }} Goal
      </strong>
    </v-progress-linear>
    <br />
    <v-btn color="#D4AF37" @click="addCoin">Add me ($1)</v-btn>

    <GChart type="PieChart" :data="chartData" :options="chartOptions" />
    <div>
      <v-btn color="success" @click="payment()">Donate me coffe</v-btn>
    </div>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import { mapGetters } from "vuex";

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

  created() {
    this.$store.dispatch("requestPresentation/bindRequest");
  },

  computed: {
    ...mapGetters({
      request: "requestPresentation/request"
    })
  },

  methods: {
    async payment() {
      const session = await fetch(
        "https://europe-west1-pubpap-redcute.cloudfunctions.net/payment"
      );

      const sessionIdc = await session.json();

      const stripe = await loadStripe(
        "pk_test_WNZA8yZsjGbAEFC0pDAb1UrF00BJUKByPR"
      );

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionIdc.id
      });
    },

    addCoin() {
      this.$store.dispatch("requestPresentation/addCoin");
    }
  }
};
</script>

<style scoped></style>
