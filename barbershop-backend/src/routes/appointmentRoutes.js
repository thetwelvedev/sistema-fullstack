const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAvailableSlots,
  getStatistics
} = require('../controllers/appointmentController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

// Rotas públicas
router.get('/available-slots', getAvailableSlots);

// Rotas protegidas (requerem autenticação)
router.post('/', protect, createAppointment);
router.get('/', protect, getAllAppointments);
router.get('/statistics', protect, authorize('admin'), getStatistics);
router.get('/:id', protect, getAppointmentById);
router.put('/:id', protect, updateAppointment);

// Rotas apenas para admin
router.delete('/:id', protect, authorize('admin'), deleteAppointment);

module.exports = router;