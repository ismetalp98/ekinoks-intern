import Joi from 'joi';

const schemes = {
    create_customer: Joi.object().keys({
        name: Joi.string().max(18).trim().required(),
        address: Joi.string(),
        phone: Joi.string().required(),
        // phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }),
    login_customer: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }),
};

export default schemes;
