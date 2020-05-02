const functions = require("firebase-functions");
const stripe = require("stripe")("sk_test_QHUsLKmLDRAJbMTNtnhcmNV900HPnjSqdA");

exports.payment = functions
  .region("europe-west1")
  .https.onRequest(async (request, response) => {
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
