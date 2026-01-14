const Service = require('../models/Service');
const { createServiceSchema, updateServiceSchema } = require('../validators/serviceValidator');

exports.createService = async (req, res) => {
  try {
    const { error } = createServiceSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Serviço criado com sucesso',
      data: { service }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar serviço',
      error: error.message
    });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const { isActive } = req.query;
    const filter = isActive !== undefined ? { isActive: isActive === 'true' } : {};

    const services = await Service.find(filter);

    res.status(200).json({
      success: true,
      count: services.length,
      data: { services }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar serviços',
      error: error.message
    });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Serviço não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: { service }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar serviço',
      error: error.message
    });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { error } = updateServiceSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Serviço não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Serviço atualizado com sucesso',
      data: { service }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar serviço',
      error: error.message
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Serviço não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Serviço deletado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar serviço',
      error: error.message
    });
  }
};