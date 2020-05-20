const admin = require("firebase-admin");
const functions = require("firebase-functions");

//functions.config().firebase
admin.initializeApp();

const upvotes = require("./firestore/upvotes");
const payment = require("./payment/payment_gateway");

// PAYMENT API
exports.payment = payment.payment;

// FIRESTORE FUNCTIONS
exports.countupvotescreate = upvotes.countupvotescreate;
exports.countupvotesupdate = upvotes.countupvotesupdate;
exports.countupvotesdelete = upvotes.countupvotesdelete;

// Algolia functions
// const algolia = require("./algolia/one_time_upload");
// exports.sendCollectionToAlgolia = algolia.sendCollectionToAlgolia; // just for one-time batch uploads of the whole firestore

const algolia = require("./algolia/listeners");
exports.algoliaCreatePaper = algolia.algoliaCreatePaper;
exports.algoliaDeletePaper = algolia.algoliaDeletePaper;

const paymentFcn = require("./payment/paymentFcn")
exports.paymentFcn = paymentFcn.paymentFcn;
