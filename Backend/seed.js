// seed.js
const mongoose = require('mongoose');
const Producto = require('./models/producto');

mongoose.connect('mongodb://localhost:27017/tienda', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productos = [
  {
    nombre: 'Guitarra',
    descripcion: 'Descripción del Producto 1',
    precio: 100,
    fechaAgregado: new Date()
  },
  {
    nombre: 'Xbox',
    descripcion: 'Descripción del Producto 2',
    precio: 150,
    fechaAgregado: new Date()
  },
  {
    nombre: 'Camiseta',
    descripcion: 'Descripción del Producto 3',
    precio: 200,
    fechaAgregado: new Date()
  },
  {
    nombre: 'Computadora',
    descripcion: 'Descripción del Producto 4',
    precio: 1000,
    fechaAgregado: new Date()
  },
  {
    nombre: 'Videojuego',
    descripcion: 'Descripción del Producto 5',
    precio: 60,
    fechaAgregado: new Date()
  }
];

const seedDatabase = async () => {
  try {
    await Producto.deleteMany({});
    await Producto.insertMany(productos);
    console.log('Productos agregados correctamente.');
  } catch (error) {
    console.error('Error al agregar productos:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();