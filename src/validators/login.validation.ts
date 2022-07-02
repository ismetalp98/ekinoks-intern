import Joi from 'joi';

const schemes = {
    login_user: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
};

export default schemes;
