const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const config = require('../config.json');
const paymentService = require('./payments.service');

// routes
router.post('/stripe-payment', paymentSchema, stripePayment);
router.post('/fetch-key', fetchPublishableKey);

module.exports = router;

async function stripePayment(req, res, next) {
  try {
    const paymentIntent = await paymentService.stripePayment(req.body, res);
    return res.status(200).send({
      clientSecret: paymentIntent.client_secret,
      nextAction: paymentIntent.next_action,
    });
  } catch (error) {
    return res.status(402).send(error);
  }
}
async function fetchPublishableKey(req, res, next) {
  try {
    return res.status(200).send(config.stripe.publishable);
  } catch (error) {
    return res.status(402).send(error);
  }
}

function paymentSchema(req, res, next) {
  const schema = Joi.object({
    status: Joi.string().required(),
    service: Joi.string().required(),
    saleInfo: Joi.object({
      bedroom: Joi.number().required(),
      bathroom: Joi.number().required(),
      garden: Joi.number().required(),
      gasAppliance: Joi.number().required(),
      furnished: Joi.boolean().required(),
    }),
    email: Joi.email().required(),
  });
  validateRequest(req, next, schema);
}
