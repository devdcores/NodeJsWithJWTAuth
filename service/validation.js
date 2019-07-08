const Joi = require('@hapi/joi');

//Registration Request params validation.
const registrationValidation = (data) => {
    const schema = {
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    }
    return Joi.validate(data, schema);
}

//Login Request params validation.
const loginValidation = (data) => {
    const schema = {
        email: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    }
    return Joi.validate(data, schema);
}

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;