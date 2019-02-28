const Joi = require('joi');

const Schema = Joi.object().keys({
  text: Joi.string().alphanum().min(3).max(30)
    .required(),
});

module.exports = Schema;
