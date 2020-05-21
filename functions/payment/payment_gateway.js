const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.secretkey);
const admin = require("firebase-admin");
const express = require("express");
const app = express();

// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = functions.config().stripe.webhookkey;

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require("body-parser");

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
      const paperId = session.metadata.paperId;
      const userId = session.client_reference_id;

      try {
        await admin
          .firestore()
          .collection("papers")
          .doc(paperId)
          .update({
            "requestPresentation.currentValue": admin.firestore.FieldValue.increment(
              amount
            ),
            "requestPresentation.audienceSize": admin.firestore.FieldValue.increment(
              1
            ),
            "requestPresentation.subsIds": admin.firestore.FieldValue.arrayUnion(
              userId
            )
          });
      } catch (error) {
        console.log(error);
      }
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  }
);

exports.payment = functions.region("europe-west1").https.onRequest(app);
