require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Essencial para receber JSON do Frontend [cite: 14]

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.error("Erro ao conectar:", err));

// Rota de teste inicial
app.get('/', (req, res) => {
    res.json({ message: "Servidor Full Stack rodando!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

//coloca no tua conta do mongo