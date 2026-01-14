require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../src/models/Service');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Erro ao conectar:', error);
    process.exit(1);
  }
};

const services = [
  {
    name: 'Corte Masculino',
    description: 'Corte de cabelo masculino tradicional com máquina e tesoura',
    duration: 30,
    price: 35.00
  },
  {
    name: 'Barba',
    description: 'Aparar e modelar a barba com navalha e acabamento',
    duration: 20,
    price: 25.00
  },
  {
    name: 'Corte + Barba',
    description: 'Combo completo: corte de cabelo e barba',
    duration: 45,
    price: 50.00
  },
  {
    name: 'Corte Infantil',
    description: 'Corte de cabelo para crianças até 12 anos',
    duration: 25,
    price: 30.00
  },
  {
    name: 'Desenho no Cabelo',
    description: 'Arte e desenhos personalizados no cabelo',
    duration: 15,
    price: 15.00
  },
  {
    name: 'Hidratação',
    description: 'Tratamento capilar com hidratação profunda',
    duration: 30,
    price: 40.00
  }
];

const seedServices = async () => {
  try {
    await connectDB();

    // Limpar serviços existentes (opcional)
    await Service.deleteMany({});
    console.log('🗑️  Serviços anteriores removidos');

    // Criar novos serviços
    const createdServices = await Service.insertMany(services);

    console.log('Serviços criados com sucesso!');
    console.log('═══════════════════════════════');
    createdServices.forEach(service => {
      console.log(`${service.name} - R$ ${service.price.toFixed(2)} - ${service.duration} min`);
    });
    console.log('═══════════════════════════════');
    console.log(`Total: ${createdServices.length} serviços`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Erro ao criar serviços:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedServices();