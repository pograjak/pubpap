<template>
  <v-list>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">Request online presentation</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <v-list-item>
      <v-list-item-content>
        <p class="body-1 mb-2">The author wants to present the paper online!</p>

        <v-progress-linear
          rounded
          class="mb-4"
          color="#D4AF37"
          height="30"
          :value="(request.currentValue / request.goal) * 100"
          striped
        >
          <strong>{{ request.currentValue / request.bid }} / {{ request.goal / request.bid }} Tickets sold</strong>
        </v-progress-linear>

        <p class="body-2 mb-4">
          The presentation takes place once all tickets are sold.
          <br />Show your interest by buying a ticket.
        </p>
        <p class="caption mb-4" style="line-height:100%">
          The deal is
          <strong>all or nothing</strong>. If the audience goal is not reached by 1st Aug 2020, we will return you money.
        </p>

        <v-btn
          :class="{ btnSold : request.subsIds.includes(user.id), btnActive: !request.subsIds.includes(user.id) }"
          @click="payment()"
          :loading="loading"
          :disabled="!user.id"
          max-width="300px"
        >
          <v-icon>{{ ticketButtonIcon }}</v-icon>&nbsp;
          <strong>{{ ticketButtonText }}</strong>
        </v-btn>
      </v-list-item-content>
    </v-list-item>

    <!-- <v-list-item>
      <v-list-item-title class="justify-center">See the video summary:</v-list-item-title>
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
    </v-list-item>-->
  </v-list>
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

  // created() {
  //   this.$store.dispatch(
  //     "requestPresentation/bindRequest",
  //     this.$route.params.id
  //   );
  // },

  computed: {
    ...mapGetters(["user"]),
    ...mapGetters({
      request: "paper/requestPresentation"
    }),
    ticketButtonIcon() {
      if (!this.user.id) {
        return "mdi-login";
      } else {
        if (this.request.subsIds.includes(this.user.id)) {
          return "mdi-check-circle";
        } else {
          return "mdi-ticket";
        }
      }
    },
    ticketButtonText() {
      if (!this.user.id) {
        return `Log in to buy (USD ${this.request.bid})`;
      } else {
        if (this.request.subsIds.includes(this.user.id)) {
          return "Ticket bought";
        } else {
          return `I am interested! (USD ${this.request.bid})`;
        }
      }
    }
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
.btnActive {
  background-color: #d4af37 !important;
  color: white;
}
.btnSold {
  background-color: #4caf50 !important;
  color: white;
  pointer-events: none;
}
</style>
