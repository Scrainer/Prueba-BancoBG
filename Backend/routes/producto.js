const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');
const Favorito = require('../models/favorito');

// Consultar listado de productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Consultar listado de productos deseados
router.get('/favoritos', async (req, res) => {
  try {
    // Obtener todos los favoritos y poblar los productos relacionados
    const favoritos = await Favorito.find().populate({
      path: '_id',
      select: 'nombre precio fechaCreacion', // Selecciona solo los campos necesarios del producto
    });

    // Formatear la respuesta para incluir la fecha de agregado
    const productosFavoritos = favoritos.map(fav => ({
      ...fav._id.toObject(), // Información del producto
      fechaAgregado: fav.fechaAgregado, // Fecha de agregado desde Favorito
    }));

    res.json(productosFavoritos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Agregar un producto como "producto deseado"
router.post('/favoritos', async (req, res) => {
  const { productoId } = req.body;
  try {
    // Verificar si el producto ya está en favoritos
    const existingFavorito = await Favorito.findById(productoId);
    if (existingFavorito) return res.status(400).json({ message: 'El producto ya está en favoritos' });

    // Crear un nuevo favorito con el productoId como _id
    const favorito = new Favorito({ _id: productoId });
    await favorito.save();
    res.status(201).json(favorito);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Eliminar un producto deseado
router.delete('/favoritos/:id', async (req, res) => {
  try {
    const result = await Favorito.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Favorito no encontrado' });
    res.json({ message: 'Favorito eliminado' });
  } catch (err) {
    console.error('Error deleting favorite:', err);
    res.status(500).json({ message: err.message });
  }
});

// Consultar detalles de un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
