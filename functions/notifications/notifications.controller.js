const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const inviteService = require('./notifications.service');

// routes
router.post('/create', createSchema, create);

module.exports = router;

function create(req, res, next) {
  inviteService
    .create(req.body, req.get('origin'))
    .then(invite =>
      res.json({
        ...invite,
        message:
          'Invitation successful, please advise your invited to check their email',
      }),
    )
    .catch(next);
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    status: Joi.string().required(),
    type: Joi.string().required(),
    user: Joi.string(),
    name: Joi.string(),
    inviteUser: Joi.string(),
    email: Joi.string().email().required(),
  });
  validateRequest(req, next, schema);
}
