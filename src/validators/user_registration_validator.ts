import * as Joi from "joi"


const user_register_schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(8).required(),
    role: Joi.string().required()
})

export default user_register_schema