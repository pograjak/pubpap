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
          <strong>
            {{ request.currentValue / request.bid }} /
            {{ request.goal / request.bid }} Tickets sold
          </strong>
        </v-progress-linear>

        <p class="body-2 mb-4">
          The presentation takes place once all tickets are sold.
          <br />Show your interest by buying a ticket.
        </p>
        <p class="caption mb-4" style="line-height:100%">
          The deal is
          <strong>all or nothing</strong>. If the audience goal is not reached
          by 1st Aug 2020, we will return you money.
        </p>

        <v-btn
          :class="{
            btnSold: request.subsIds.includes(user.id),
            btnActive: !request.subsIds.includes(user.id)
          }"
          @click="testDialog = true"
          :loading="loading"
          :disabled="!user.id"
          max-width="300px"
        >
          <v-icon>{{ ticketButtonIcon }}</v-icon>&nbsp;
          <strong>{{ ticketButtonText }}</strong>
        </v-btn>
      </v-list-item-content>
    </v-list-item>

    <!-- Test dialog -->
    <v-dialog v-model="testDialog" max-width="600px">
      <v-card>
        <v-card-title class="title font-weight-bold">pubpap is in test mode</v-card-title>

        <v-card-text class="text-center orange-text text--darken-4 orange lighten-4 py-4">
          <p>Currently we are testing application. Thus everything is free.</p>
          <p>To buy a test ticket, enter the following card number:</p>
          <p>
            <strong>4242 4242 4242 4242</strong>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon v-clipboard:copy="'4242424242424242'">
                  <v-icon>mdi-clipboard-text-outline</v-icon>
                </v-btn>
              </template>
              <span class="caption">Copy to clipboard</span>
            </v-tooltip>
          </p>
          <p class="mb-0">
            Expiry date, CVC and name can be random.
            <br />You won't be charged anything.
          </p>
        </v-card-text>

        <v-card-text class="body-2 py-4 text-right">Thank you for checking pubpap out!</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="testDialog = false">Cancel</v-btn>
          <!-- TODO: Change to our email -->
          <v-btn color="primary" @click="payment()" :loading="loading">Proceed</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import { loadStripe } from "@stripe/stripe-js";
import { mapGetters } from "vuex";
import loginVue from "../pages/login.vue";

VueClipboard.config.autoSetContainer = true; // add this line
Vue.use(VueClipboard);

export default {
  data() {
    return {
      loading: false,
      testDialog: false,
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
      request: "paper/requestPresentation",
      paper: "paper/paper"
    }),
    paperURL() {
      // TODO: change this to correct address
      return `https://pubpap.com/paper/${this.$route.params.id}`;
    },
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
      
      try {
        // Callable function
        var paymentFcn = this.$fireFunc.httpsCallable("paymentFcn");
        const result = await paymentFcn({ paperId: this.paper.paperId });

        console.log("Result:");
        console.log(result.data);

        const sessionIdc = result.data;

        const stripe = await loadStripe(
          "pk_test_WNZA8yZsjGbAEFC0pDAb1UrF00BJUKByPR"
        );

        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionIdc.id
        });

        this.loading = false;
      } catch (error) {
        console.log(error);
        // TODO: change to valid email address
        alert("Error loading payment request! Please try later or contact support: support@pubpap.com");
        this.loading = false;
      }

     /* HTTPS request call
     const payload = {
        uid: this.user.id,
        userEmail: this.user.email,
        paperId: this.$route.params.id
      };

      try {
        // TODO: send uid paper id
        const session = await fetch(
          "https://europe-west1-pubpap-redcute.cloudfunctions.net/payment",
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(payload)
          }
        );

        const sessionIdc = await session.json();

        const stripe = await loadStripe(
          "pk_test_WNZA8yZsjGbAEFC0pDAb1UrF00BJUKByPR"
        );

        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionIdc.id
        });
      } catch (error) {
        console.log(error);
      }
      */
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
