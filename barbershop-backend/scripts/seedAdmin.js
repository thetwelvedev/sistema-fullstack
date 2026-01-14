require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Erro ao conectar:', error);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    await connectDB();

    // Verificar se já existe um admin
    const adminExists = await User.findOne({ email: 'admin@barbershop.com' });
    
    if (adminExists) {
      console.log('Admin já existe!');
      console.log('Email:', adminExists.email);
      console.log('Nome:', adminExists.name);
      await mongoose.connection.close();
      process.exit(0);
    }

    // Criar admin
    const admin = await User.create({
      name: 'Administrador',
      email: 'admin@barbershop.com',
      password: 'admin123',
      phone: '(85) 99999-9999',
      role: 'admin'
    });

    console.log('Admin criado com sucesso!');
    console.log('═══════════════════════════════');
    console.log('Email: admin@barbershop.com');
    console.log('Senha: admin123');
    console.log('Nome:', admin.name);
    console.log('Telefone:', admin.phone);
    console.log('═══════════════════════════════');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Erro ao criar admin:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedAdmin();