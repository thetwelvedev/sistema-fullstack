const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().trim().max(100).required().messages({
    'string.empty': 'Nome é obrigatório',
    'string.max': 'Nome não pode ter mais de 100 caracteres'
  }),
  email: Joi.string().email().lowercase().trim().required().messages({
    'string.empty': 'Email é obrigatório',
    'string.email': 'Email inválido'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Senha é obrigatória',
    'string.min': 'Senha deve ter no mínimo 6 caracteres'
  }),
  phone: Joi.string().trim().required().messages({
    'string.empty': 'Telefone é obrigatório'
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required().messages({
    'string.empty': 'Email é obrigatório',
    'string.email': 'Email inválido'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Senha é obrigatória'
  })
});

module.exports = {
  registerSchema,
  loginSchema
};