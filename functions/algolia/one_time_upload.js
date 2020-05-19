// SOURCE: https://medium.com/@soares.rfarias/how-to-set-up-firestore-and-algolia-319fcf2c0d37

// Import all needed modules.
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");

// Set up Firestore.
// admin.initializeApp();
const db = admin.firestore();

// Set up Algolia.
// The app id and API key are coming from the cloud functions environment, as we set up in Part 1, Step 3.
const algoliaClient = algoliasearch(functions.config().algolia.appid, functions.config().algolia.apikey);
const collectionIndex = algoliaClient.initIndex("papers");

// Create a HTTP request cloud function.
exports.sendCollectionToAlgolia = functions.region("europe-west1").https.onRequest(async (req, res) => {

	// This array will contain all records to be indexed in Algolia.
	// A record does not need to necessarily contain all properties of the Firestore document,
	// only the relevant ones. 
	const algoliaRecords = [];

	// Retrieve all documents from the COLLECTION collection.
	const querySnapshot = await db.collection('papers').get();

	querySnapshot.docs.forEach(doc => {
		const dat = doc.data();
        // Essentially, you want your records to contain any information that facilitates search, 
        // display, filtering, or relevance. Otherwise, you can leave it out.
        const record = {
            objectID: doc.id,
            title: dat.title,
            authors: dat.authors,
            summary: dat.summary,
            arxLink: dat.arxLink,
            createdAt: dat.createdAt.toDate().getTime() / 1000
        };

        algoliaRecords.push(record);
    });
	
	// After all records are created, we save them to 
	collectionIndex.saveObjects(algoliaRecords).then((_error, content) => {
        res.send("COLLECTION was indexed to Algolia successfully.");
    });
	
})