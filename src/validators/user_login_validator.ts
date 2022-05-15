import * as Joi from "joi"


const user_login_schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(8).required()
})

export default user_login_schema