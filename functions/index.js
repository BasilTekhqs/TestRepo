// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./_middleware/error-handler');
// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// Create an Express object and routes (in order)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// allow cors requests from any origin 
app.use(cors());
// api routes
app.use('/', require('./invites/invites.controller'));
app.use('/', require('./payments/payments.controller'));
app.use('/', require('./payments/notifications.controller'));


// INVITE PAGE
app.get('/invite/:inviteId', function(request, response) {
  response.sendFile(__dirname +  '/download.html');
});

// global error handler
app.use(errorHandler);
// Set our GCF handler to our Express app.
exports.invites = functions.region('europe-west2').https.onRequest(app);
exports.payments = functions.region('europe-west2').https.onRequest(app);
exports.notificationScheduler = functions.pubsub
  .schedule('0 8 * * *')
  .timeZone('Europe/London')
  .onRun(context => {
    return null;
  });
