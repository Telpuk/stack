const Joi = require('joi');

const Schema = Joi.object().keys({
  key: Joi.string().alphanum().min(3).max(30)
    .required(),
  value: Joi.string().alphanum().min(3).max(30)
    .required(),
  ttl: Joi.number().integer().min(0),
});

module.exports = Schema;
