<template>
  <div>
    <v-list>
      <v-list-item style="min-height:80px">
        <v-list-item-content>
          <v-list-item-title class="display-1"
            >Request online presentation</v-list-item-title
          >
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
        <v-btn
          color="success"
          @click="$router.push(`/login/?nextPage=${$route.fullPath}`)"
        >
          Redirect to login with mem
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="#D4AF37"
          align-center
          @click="payment()"
          :loading="loading"
          :disable="loading"
          >Buy a ticket (10 Kč)</v-btn
        >
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="justify-center">
          See the video summary:
        </v-list-item-title>
      </v-list-item>
      <v-list-item class="mt-2">
        <div class="video-container">
          <iframe
            class="video-video"
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
import loginVue from "../pages/login.vue";

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
    this.$store.dispatch(
      "requestPresentation/bindRequest",
      this.$route.params.id
    );
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
    }
  }
};
</script>

<style scoped>
.justify-center {
  text-align: justify;
}

.video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}

.video-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
