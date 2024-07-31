import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('name'); // 'name', 'price', 'date'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' (ascendente) o 'desc' (descendente)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/productos/favoritos');
        const productosFavoritos = response.data;

        // Ordenar productos favoritos
        const sortedFavorites = [...productosFavoritos].sort((a, b) => {
          const comparison = (() => {
            switch (sortBy) {
              case 'price':
                return a.precio - b.precio;
              case 'date':
                return new Date(a.fechaAgregado) - new Date(b.fechaAgregado);
              case 'name':
              default:
                return a.nombre.localeCompare(b.nombre);
            }
          })();

          return sortOrder === 'asc' ? comparison : -comparison;
        });

        setFavorites(sortedFavorites);
      } catch (error) {
        alert('Error al obtener la lista de favoritos');
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [sortBy, sortOrder]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleRemoveFromFavorites = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/productos/favoritos/${productId}`);
      setFavorites(favorites.filter(favorite => favorite._id !== productId));
      alert('Producto eliminado de favoritos');
    } catch (error) {
      alert('Error al eliminar el producto de favoritos');
      console.error('Error removing product from favorites:', error);
    }
  };

  return (
    <div>
      <h2>Productos Favoritos</h2>
      <label htmlFor="sort">Ordenar por:</label>
      <select id="sort" value={sortBy} onChange={handleSortChange}>
        <option value="name">Nombre</option>
        <option value="price">Precio</option>
        <option value="date">Fecha Agregada</option>
      </select>

      <label htmlFor="sortOrder">Orden:</label>
      <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>

      <ul>
        {favorites.map(product => (
          <li key={product._id}>
            {product.nombre} - ${product.precio} - Fecha Agregada: {new Date(product.fechaAgregado).toLocaleString()}
            <button onClick={() => handleRemoveFromFavorites(product._id)}>Eliminar de Favoritos</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FavoriteList;
