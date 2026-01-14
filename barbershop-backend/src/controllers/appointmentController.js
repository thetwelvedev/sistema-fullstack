const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const { createAppointmentSchema, updateAppointmentSchema } = require('../validators/appointmentValidator');

// Criar novo agendamento
exports.createAppointment = async (req, res) => {
  try {
    const { error } = createAppointmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { service, dateTime, notes } = req.body;

    const serviceExists = await Service.findById(service);
    if (!serviceExists || !serviceExists.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Serviço não encontrado ou inativo'
      });
    }

    const appointmentDate = new Date(dateTime);
    const startRange = new Date(appointmentDate.getTime() - 30 * 60000);
    const endRange = new Date(appointmentDate.getTime() + serviceExists.duration * 60000);

    const conflictingAppointment = await Appointment.findOne({
      dateTime: {
        $gte: startRange,
        $lt: endRange
      },
      status: 'scheduled'
    });

    if (conflictingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'Já existe um agendamento neste horário'
      });
    }

    const appointment = await Appointment.create({
      client: req.user.id,
      service,
      dateTime,
      notes
    });

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('client', 'name email phone')
      .populate('service', 'name duration price');

    res.status(201).json({
      success: true,
      message: 'Agendamento criado com sucesso',
      data: { appointment: populatedAppointment }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar agendamento',
      error: error.message
    });
  }
};

// Buscar todos os agendamentos
exports.getAllAppointments = async (req, res) => {
  try {
    const { status, date } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      filter.dateTime = {
        $gte: startDate,
        $lte: endDate
      };
    }

    if (req.user.role === 'client') {
      filter.client = req.user.id;
    }

    const appointments = await Appointment.find(filter)
      .populate('client', 'name email phone')
      .populate('service', 'name duration price')
      .sort({ dateTime: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: { appointments }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar agendamentos',
      error: error.message
    });
  }
};

// Buscar agendamento por ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('client', 'name email phone')
      .populate('service', 'name duration price');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Agendamento não encontrado'
      });
    }

    if (req.user.role === 'client' && appointment.client._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado'
      });
    }

    res.status(200).json({
      success: true,
      data: { appointment }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar agendamento',
      error: error.message
    });
  }
};

// Atualizar agendamento
exports.updateAppointment = async (req, res) => {
  try {
    const { error } = updateAppointmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Agendamento não encontrado'
      });
    }

    if (req.user.role === 'client' && appointment.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado'
      });
    }

    if (req.body.dateTime) {
      const newDateTime = new Date(req.body.dateTime);
      const service = await Service.findById(appointment.service);
      
      const startRange = new Date(newDateTime.getTime() - 30 * 60000);
      const endRange = new Date(newDateTime.getTime() + service.duration * 60000);

      const conflictingAppointment = await Appointment.findOne({
        _id: { $ne: req.params.id },
        dateTime: {
          $gte: startRange,
          $lt: endRange
        },
        status: 'scheduled'
      });

      if (conflictingAppointment) {
        return res.status(400).json({
          success: false,
          message: 'Já existe um agendamento neste horário'
        });
      }
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('client', 'name email phone')
      .populate('service', 'name duration price');

    res.status(200).json({
      success: true,
      message: 'Agendamento atualizado com sucesso',
      data: { appointment: updatedAppointment }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar agendamento',
      error: error.message
    });
  }
};

// Deletar agendamento
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Agendamento não encontrado'
      });
    }

    await Appointment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Agendamento deletado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar agendamento',
      error: error.message
    });
  }
};

// Buscar horários disponíveis
exports.getAvailableSlots = async (req, res) => {
  try {
    const { date, serviceId } = req.query;

    if (!date || !serviceId) {
      return res.status(400).json({
        success: false,
        message: 'Data e serviço são obrigatórios'
      });
    }

    const service = await Service.findById(serviceId);
    if (!service || !service.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Serviço não encontrado ou inativo'
      });
    }

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      dateTime: {
        $gte: selectedDate,
        $lte: endDate
      },
      status: 'scheduled'
    }).populate('service');

    const workingHours = {
      start: 9,
      end: 18
    };

    const slots = [];
    const slotInterval = 30;

    for (let hour = workingHours.start; hour < workingHours.end; hour++) {
      for (let minute = 0; minute < 60; minute += slotInterval) {
        const slotTime = new Date(selectedDate);
        slotTime.setHours(hour, minute, 0, 0);

        const isAvailable = !appointments.some(apt => {
          const aptTime = new Date(apt.dateTime);
          const aptEndTime = new Date(aptTime.getTime() + apt.service.duration * 60000);
          const slotEndTime = new Date(slotTime.getTime() + service.duration * 60000);

          return (
            (slotTime >= aptTime && slotTime < aptEndTime) ||
            (slotEndTime > aptTime && slotEndTime <= aptEndTime) ||
            (slotTime <= aptTime && slotEndTime >= aptEndTime)
          );
        });

        if (isAvailable && slotTime > new Date()) {
          slots.push({
            dateTime: slotTime,
            available: true,
            displayTime: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
          });
        }
      }
    }

    res.status(200).json({
      success: true,
      count: slots.length,
      data: { 
        slots,
        service: {
          id: service._id,
          name: service.name,
          duration: service.duration,
          price: service.price
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar horários disponíveis',
      error: error.message
    });
  }
};

// Buscar estatísticas (apenas para admin)
exports.getStatistics = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const totalAppointments = await Appointment.countDocuments();

    const todayAppointments = await Appointment.countDocuments({
      dateTime: {
        $gte: today,
        $lt: tomorrow
      }
    });

    const scheduledCount = await Appointment.countDocuments({ status: 'scheduled' });
    const completedCount = await Appointment.countDocuments({ status: 'completed' });
    const cancelledCount = await Appointment.countDocuments({ status: 'cancelled' });

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const upcomingAppointments = await Appointment.find({
      dateTime: {
        $gte: today,
        $lt: nextWeek
      },
      status: 'scheduled'
    })
      .populate('client', 'name email')
      .populate('service', 'name duration price')
      .sort({ dateTime: 1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        statistics: {
          total: totalAppointments,
          today: todayAppointments,
          scheduled: scheduledCount,
          completed: completedCount,
          cancelled: cancelledCount
        },
        upcomingAppointments
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar estatísticas',
      error: error.message
    });
  }
};