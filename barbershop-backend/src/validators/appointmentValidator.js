const Joi = require('joi');

const createAppointmentSchema = Joi.object({
  service: Joi.string().hex().length(24).required().messages({
    'string.empty': 'Serviço é obrigatório',
    'string.hex': 'ID do serviço inválido',
    'string.length': 'ID do serviço inválido'
  }),
  dateTime: Joi.date().iso().greater('now').required().messages({
    'date.base': 'Data inválida',
    'date.greater': 'Data deve ser futura'
  }),
  notes: Joi.string().max(500).allow('').optional()
});

const updateAppointmentSchema = Joi.object({
  dateTime: Joi.date().iso().greater('now'),
  status: Joi.string().valid('scheduled', 'completed', 'cancelled'),
  notes: Joi.string().max(500).allow('')
}).min(1);

module.exports = {
  createAppointmentSchema,
  updateAppointmentSchema
};