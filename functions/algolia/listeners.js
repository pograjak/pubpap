// SOURCE: https://medium.com/@soares.rfarias/how-to-set-up-firestore-and-algolia-319fcf2c0d37

// Import all needed modules.
const functions = require("firebase-functions");
const algoliasearch = require("algoliasearch");

const algoliaClient = algoliasearch(
  functions.config().algolia.appid,
  functions.config().algolia.apikey
);
const collectionIndex = algoliaClient.initIndex("papers");

// Counting up/down votes
exports.algoliaCreatePaper = functions
  .region("europe-west1")
  .firestore.document("/papers/{paperId}")
  .onCreate(async (snap, context) => {
    const dat = snap.data();

    console.log(
      "Paper created - id: " + context.params.paperId + " title: " + dat.title
    );

    const record = {
      objectID: context.params.paperId,
      title: dat.title,
      authors: dat.authors,
      // summary: dat.summary,
      arxLink: dat.arxLink,
      createdAt: dat.createdAt.toDate().getTime() / 1000  // algolia only accepts numbers -> seconds from epoch
    };

    await collectionIndex.saveObject(record);
  });

exports.algoliaDeletePaper = functions
  .region("europe-west1")
  .firestore.document("/papers/{paperId}")
  .onDelete(async (snap, context) => {
    const dat = snap.data();

    console.log(
      "Paper deleted - id: " + context.params.paperId + " title: " + dat.title
    );

    await collectionIndex.deleteObject(context.params.paperId);
  });
