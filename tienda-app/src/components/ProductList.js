import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [precioPromedio, setPrecioPromedio] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/productos');
        setProducts(response.data);

        const precioTotal = products.reduce((acc,producto) => acc + producto.precio,0);
        const promedio = precioTotal/products.length; //Deberia ser 302

        setPrecioPromedio(promedio)

      } catch (error) {
        alert('Error al obtener la lista de productos');
        console.error('Error fetching products:', error);
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/productos/favoritos');
        setFavorites(response.data.map(product => product._id));
      } catch (error) {
        alert('Error al obtener la lista de favoritos');
        console.error('Error fetching favorites:', error);
      }
    };

    fetchProducts();
    fetchFavorites();
  }, []);

  const handleAddToFavorites = async (productId) => {
    try {
      await axios.post('http://localhost:3000/api/productos/favoritos', { productoId: productId });
      alert('Producto agregado a favoritos');
      setFavorites([...favorites, productId]);
    } catch (error) {
      alert('Error al agregar el producto a favoritos');
      console.error('Error adding product to favorites:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id} style={{textTransform: product.precio > precioPromedio ? 'uppercase' : 'none'}}>
            {product.nombre} - ${product.precio}
            <button
              onClick={() => handleAddToFavorites(product._id)}
              disabled={favorites.includes(product._id)}
            >
              {favorites.includes(product._id) ? 'Ya en Favoritos' : 'Añadir a Favoritos'}
            </button>
            <Link to={`/producto/${product._id}`}>Ver Detalles</Link>
          </li>
        ))}
      </ul>
      <Link to="/favoritos">Ver Favoritos</Link>
    </div>
  );
};

export default ProductList;
