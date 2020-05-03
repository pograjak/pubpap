<template>
  <div>
    <v-list>
      <v-list-item style="min-height:80px">
        <v-list-item-content>
          <h1>Request online presentation</h1>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item>
        <v-progress-linear
          rounded
          color="#D4AF37"
          height="30"
          :value="(request.requestCurrent / request.requestGoal) * 100"
          striped
        >
          <strong
            >{{ request.requestCurrent }} /
            {{ request.requestGoal }} Goal</strong
          >
        </v-progress-linear>
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="justify-center">
          Let's chat over this paper online!
          <br />Author will organize an online conference in case of interest.
          <br />
          To show you're for real, chip in a few coins for a beer to the author.
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-spacer></v-spacer>
        <v-btn
          color="#D4AF37"
          align-center
          @click="payment()"
          :loading="loading"
          :disable="loading"
          >Buy a ticket (10 Kč)</v-btn
        >
        <!-- <v-btn text>This is interesting</v-btn> -->
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="justify-center">
          See the video summary:
        </v-list-item-title>
      </v-list-item>

      <v-list-item class="mt-2">
        <div>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/MPdj8KGZHa0"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </v-list-item>
    </v-list>
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

<style scoped>
.justify-center {
  text-align: justify;
}
</style>
