import Joi from 'joi';

const schemes = {
    create_vendor: Joi.object().keys({
        name: Joi.string().max(18).trim().required(),
        owner_name: Joi.string().max(25).required(),
        pin_code: Joi.number().integer().min(1000).max(9999).required(),
        address: Joi.string().max(128).required(),
        phone: Joi.string().max(12).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }),
    get_vendor_id: Joi.number().required(),
    get_vendor_email: Joi.string().required(),
    delete_vendor: Joi.string().required(),
    login_vendor: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
};

export default schemes;
