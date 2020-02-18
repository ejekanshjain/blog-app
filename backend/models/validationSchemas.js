const Joi = require('@hapi/joi')

const UserSchema = new Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().min(1).required(),
    password: Joi.string().min(6).required()
})

const UserPatchSchema = new Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().min(1).required()
})

const LoginSchema = new Joi.object({
    email: Joi.string().email().min(1).required(),
    password: Joi.string().min(1).required()
})

const PostSchema = new Joi.object({
    title: Joi.string().min(1).required(),
    body: Joi.string().min(1).required()
})

module.exports.UserSchema = UserSchema
module.exports.UserPatchSchema = UserPatchSchema
module.exports.PostSchema = PostSchema
module.exports.LoginSchema = LoginSchema