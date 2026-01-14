const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome do serviço é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome não pode ter mais de 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
    maxlength: [500, 'Descrição não pode ter mais de 500 caracteres']
  },
  duration: {
    type: Number,
    required: [true, 'Duração é obrigatória'],
    min: [15, 'Duração mínima é 15 minutos']
  },
  price: {
    type: Number,
    required: [true, 'Preço é obrigatório'],
    min: [0, 'Preço não pode ser negativo']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);