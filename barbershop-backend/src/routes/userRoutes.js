const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

// Todas as rotas requerem autenticação
router.use(protect);

// Apenas admin pode listar todos os usuários
router.get('/', authorize('admin'), getAllUsers);

// Qualquer usuário autenticado pode ver detalhes de um usuário
router.get('/:id', getUserById);

// Usuário pode atualizar seus próprios dados
// Admin pode atualizar qualquer usuário
router.put('/:id', updateUser);

// Apenas admin pode deletar usuários
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;