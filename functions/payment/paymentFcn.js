const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")("sk_test_QHUsLKmLDRAJbMTNtnhcmNV900HPnjSqdA");

// Find your endpoint's secret in your Dashboard's webhook settings
// TODO: change this and save as firebase config
const endpointSecret = "whsec_JkLqtUMl51RHJXQgOvZSksKQ6eI8F110";

exports.paymentFcn = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    // Checking that the user is authenticated.
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
      );
    }

    const uid = context.auth.uid;
    const email = context.auth.token.email || null;

    // check email (maybe not needed)
    if (!(typeof email === "string") || email.length === 0) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Users email must be valid."
      );
    }

    // Check paperId
    const paperId = data.paperId;

    if (!(typeof paperId === "string") || paperId.length === 0) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with a paperId in a correct format."
      );
    }

    // Load paper from FS
    const paperRef = await admin
      .firestore()
      .collection("papers")
      .doc(paperId)
      .get();

    // Check if paper exists
    if (!paperRef.exists) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The given paperId was not found."
      );
    }

    const paper = paperRef.data();
    console.log("paper: ", paper);

    // Check if paper offers presentation
    if (!(typeof paper.requestPresentation.bid === "number")) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The given paper does not offer presentation requests."
      );
    }

    // Check if there is still room for one ticket
    if(paper.requestPresentation.currentValue + paper.requestPresentation.bid > paper.requestPresentation.goal){
      throw new functions.https.HttpsError(
        "invalid-argument",
        "All paper tickets are sold already."
      );
    }

    // Check double buy
    if (paper.requestPresentation.subsIds.includes(uid)) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The user already has a ticket."
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          name: `Paper: ${paper.title}`,
          description: "Presentation ticket",
          amount: paper.requestPresentation.bid * 100,
          currency: "usd",
          quantity: 1
        }
      ],
      success_url:`https://pubpap-redcute.web.app/paper/${paperId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://pubpap-redcute.web.app/paper/${paperId}`
    });

    return session;
  });
