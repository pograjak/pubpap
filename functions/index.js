const functions = require("firebase-functions");
const stripe = require("stripe")("sk_test_QHUsLKmLDRAJbMTNtnhcmNV900HPnjSqdA");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

const app = require("express")();

// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = "whsec_JkLqtUMl51RHJXQgOvZSksKQ6eI8F110";

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

app.get("/", async (request, response) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    customer_email: "test@test.unihack",

    line_items: [
      {
        name: "presentation request",
        description: "request for XXX presentation",
        amount: 1000,
        currency: "czk",
        quantity: 1
      }
    ],

    success_url:
      "https://pubpap-redcute.web.app/?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://pubpap-redcute.web.app/"
  });

  response.set("Access-Control-Allow-Origin", "*");
  response.send(session);
});

exports.payment = functions.region("europe-west1").https.onRequest(app);




// Counting up/down votes
exports.countupvotescreate = functions.region("europe-west1").firestore.document('/papers/{paperId}/threads/{threadId}/user_votes/{userId}').onCreate(
  async (snap, context) => {
    const state = snap.data().v;

    console.log('Upvote created - paper: ' + context.params.paperId + ' thread: ' + context.params.threadId + ' data: ' + state);

    var incr = 0;
    if (state > 0) {
      incr = 1;
    } else if (state < 0) {
      incr = -1;
    }

    await admin
      .firestore()
      .collection("papers")
      .doc(context.params.paperId)
      .collection("threads")
      .doc(context.params.threadId)
      .update({ votes: admin.firestore.FieldValue.increment(incr) });

    // console.log('Counter updated.');
    return null;
  });

exports.countupvotesupdate = functions.region("europe-west1").firestore.document('/papers/{paperId}/threads/{threadId}/user_votes/{userId}').onUpdate(
  async (change, context) => {
    const oldstate = change.before.data().v;
    const newstate = change.after.data().v;

    console.log('Upvote changed - paper: ' + context.params.paperId + ' thread: ' + context.params.threadId + ' from: ' + oldstate + ' to: ' + newstate);

    var incr = 0;
    if (oldstate < newstate) {  // from -1 to +1
      incr = 2;
    } else if (oldstate > newstate) {
      incr = -2;
    }

    await admin
      .firestore()
      .collection("papers")
      .doc(context.params.paperId)
      .collection("threads")
      .doc(context.params.threadId)
      .update({ votes: admin.firestore.FieldValue.increment(incr) });

    // console.log('Counter updated.');
    return null;
  });

exports.countupvotesdelete = functions.region("europe-west1").firestore.document('/papers/{paperId}/threads/{threadId}/user_votes/{userId}').onDelete(
  async (snap, context) => {
    const state = snap.data().v;

    console.log('Upvote deleted - paper: ' + context.params.paperId + ' thread: ' + context.params.threadId + ' data: ' + state);

    var incr = 0;
    if (state > 0) {
      incr = -1;
    } else if (state < 0) {
      incr = 1;
    }

    await admin
      .firestore()
      .collection("papers")
      .doc(context.params.paperId)
      .collection("threads")
      .doc(context.params.threadId)
      .update({ votes: admin.firestore.FieldValue.increment(incr) });

    // console.log('Counter updated.');
    return null;
  });



