const functions = require("firebase-functions");
const stripe = require("stripe")("sk_test_QHUsLKmLDRAJbMTNtnhcmNV900HPnjSqdA");
const admin = require("firebase-admin");
const express = require("express");
var cors = require("cors");
const app = express();

// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = "whsec_JkLqtUMl51RHJXQgOvZSksKQ6eI8F110";

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require("body-parser");

//express setting
app.use(express.json());
app.use("*", cors());
// Match the raw body to content type application/json
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        sig,
        endpointSecret,
        { expand: ["payment_intent"] }
      );
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const amount = session.display_items[0].amount / 100;

      await admin
        .firestore()
        .collection("papers")
        .doc("bVypOMp1sZ9I4R0ib5hV")
        .update({
          requestCurrent: admin.firestore.FieldValue.increment(amount)
        });
    }
    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  }
);

app.post("/", async (request, response) => {
  //  const payload = {
  //    uid: this.user.id,
  //    userEmail: this.user.email,
  //    paperId: this.paper.id
  //  };
  console.log(request.headers);
  console.log(request.body);

  const payload = request.body;

  const paperRef = await admin
    .firestore()
    .collection("papers")
    .doc(payload.paperId)
    .get();

  const paper = paperRef.data();
  console.log("paper: ", paper);

  if (paper.requestPresentation.subsIds.includes(payload.uid)) {
    response.send(
      "User already has a ticket. Can't buy more tickets from one account."
    );
  } else {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      customer_email: payload.userEmail,

      line_items: [
        {
          name: `Ticket for paper ${paper.title}`,
          description: "Ticket requesting presentation",
          amount: paper.requestPresentation.bid * 100,
          currency: "czk",
          quantity: 1
        }
      ],

      success_url:
        "https://pubpap-redcute.web.app/?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://pubpap-redcute.web.app/"
    });

    response.set("Access-Control-Allow-Origin", "http://localhost");
    response.send(session);
  }
});

exports.payment = functions.region("europe-west1").https.onRequest(app);
