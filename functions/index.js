const upvotes = require("./firestore/upvotes");
const payment = require("./payment/payment_gateway");

// PAYMENT API
exports.payment = payment.payment;

// FIRESTORE FUNCTIONS
exports.countupvotescreate = upvotes.countupvotescreate;
exports.countupvotesupdate = upvotes.countupvotesupdate;
exports.countupvotesdelete = upvotes.countupvotesdelete;
