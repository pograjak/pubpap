<template>
  <div>
    <div class="headline">Request online presentation</div>
    <v-progress-linear
      rounded
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
    <p>
      I offer a public presentation of my paper. In a case of interest it will
      be organised as a call meetup with possibility to discuss the topic and
      your question.
      <br />
      Are you interested? Let me know, show the interest or buy a ticket to a
      conf call.
    </p>
    <v-btn
      color="#D4AF37"
      @click="payment()"
      :loading="loading"
      :disable="loading"
    >
      Buy a ticket ($10)
    </v-btn>
    <v-btn text>
      This is interesting
    </v-btn>
    <GChart type="PieChart" :data="chartData" :options="chartOptions" />
    <div></div>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: false,
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
      this.loading = true;
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
