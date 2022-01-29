/* eslint-disable max-len */
import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(30)
      .required()
      .pattern(/^[A-Z]{1}[a-z]{1,}$/),

    lastName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .pattern(/^[A-Z]{1}[a-z]{2,}$/),

    email: Joi.string()
      .pattern(
        /^[0-9a-zA-Z]+([._+-][0-9a-zA-Z]+)*@([0-9a-zA-Z][-]?)+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/
      )
      .required(),

    password: Joi.string()
      .pattern(
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      )
      .required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
