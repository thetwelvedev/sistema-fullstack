const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Cliente é obrigatório']
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Serviço é obrigatório']
  },
  dateTime: {
    type: Date,
    required: [true, 'Data e hora são obrigatórias']
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  notes: {
    type: String,
    maxlength: [500, 'Observações não podem ter mais de 500 caracteres']
  }
}, {
  timestamps: true
});

// Index para buscar agendamentos por data
appointmentSchema.index({ dateTime: 1 });

// Validação: não permitir agendamentos no passado
appointmentSchema.pre('save', function(next) {
  if (this.isNew && this.dateTime < new Date()) {
    return next(new Error('Não é possível agendar para datas passadas'));
  }
  next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);