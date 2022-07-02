import Joi from 'joi';

const schemes = {
    add_food: Joi.object().keys({
        name: Joi.string().max(18).trim().required(),
        price: Joi.number().integer().min(1).required(),
        details: Joi.string().required(),
        vendor_id: Joi.number().integer().min(1).required()
    }),
};

export default schemes;
