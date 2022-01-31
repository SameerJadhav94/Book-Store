/* eslint-disable prettier/prettier */
import Joi from '@hapi/joi';

export const newBookValidator = (req, res, next) => {
  const schema = Joi.object({
    author: Joi.string().required().pattern(/^[A-Z]{1}[ A-Za-z]{1,}$/),

    title: Joi.string().min(2).required(),

    image: Joi.string().required(),

    quantity: Joi.number().required(),

    price: Joi.number().required(),

    description: Joi.string().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
