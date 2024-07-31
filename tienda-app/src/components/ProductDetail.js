import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/productos/${id}`);
        setProduct(response.data);
      } catch (error) {
        alert('Error al obtener los detalles del producto');
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Cargando...</div>;

  return (
    <div>
      <h2>{product.nombre}</h2>
      <p>Precio: ${product.precio}</p>
      <p>{product.descripcion}</p>
    </div>
  );
};

export default ProductDetail;
