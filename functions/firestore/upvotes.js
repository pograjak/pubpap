const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Counting up/down votes
exports.countupvotescreate = functions
  .region("europe-west1")
  .firestore.document(
    "/papers/{paperId}/threads/{threadId}/user_votes/{userId}"
  )
  .onCreate(async (snap, context) => {
    const state = snap.data().v;

    console.log(
      "Upvote created - paper: " +
        context.params.paperId +
        " thread: " +
        context.params.threadId +
        " data: " +
        state
    );

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

exports.countupvotesupdate = functions
  .region("europe-west1")
  .firestore.document(
    "/papers/{paperId}/threads/{threadId}/user_votes/{userId}"
  )
  .onUpdate(async (change, context) => {
    const oldstate = change.before.data().v;
    const newstate = change.after.data().v;

    console.log(
      "Upvote changed - paper: " +
        context.params.paperId +
        " thread: " +
        context.params.threadId +
        " from: " +
        oldstate +
        " to: " +
        newstate
    );

    var incr = 0;
    if (oldstate < newstate) {
      // from -1 to +1
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

exports.countupvotesdelete = functions
  .region("europe-west1")
  .firestore.document(
    "/papers/{paperId}/threads/{threadId}/user_votes/{userId}"
  )
  .onDelete(async (snap, context) => {
    const state = snap.data().v;

    console.log(
      "Upvote deleted - paper: " +
        context.params.paperId +
        " thread: " +
        context.params.threadId +
        " data: " +
        state
    );

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
