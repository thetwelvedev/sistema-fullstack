const Joi = require('joi');

const createServiceSchema = Joi.object({
  name: Joi.string().trim().max(100).required().messages({
    'string.empty': 'Nome do serviço é obrigatório',
    'string.max': 'Nome não pode ter mais de 100 caracteres'
  }),
  description: Joi.string().max(500).required().messages({
    'string.empty': 'Descrição é obrigatória',
    'string.max': 'Descrição não pode ter mais de 500 caracteres'
  }),
  duration: Joi.number().min(15).required().messages({
    'number.base': 'Duração deve ser um número',
    'number.min': 'Duração mínima é 15 minutos'
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Preço deve ser um número',
    'number.min': 'Preço não pode ser negativo'
  })
});

const updateServiceSchema = Joi.object({
  name: Joi.string().trim().max(100),
  description: Joi.string().max(500),
  duration: Joi.number().min(15),
  price: Joi.number().min(0),
  isActive: Joi.boolean()
}).min(1);

module.exports = {
  createServiceSchema,
  updateServiceSchema
};