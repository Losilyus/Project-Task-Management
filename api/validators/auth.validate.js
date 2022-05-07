import Joi from "joi";

export const RegisterSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(50).required(),
});

export const LoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(50).required(),
});

export const UserVerifySchema = Joi.object({
    code: Joi.string().min(6).max(6).required()
});

export const UserResetPasswordSchema = Joi.object({
    password: Joi.string().min(8).max(50).required(),
    retype_password: Joi.string().min(8).max(50).required(),
});
