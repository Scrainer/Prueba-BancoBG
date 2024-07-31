import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import FavoritesPage from './pages/FavoritesPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Inicio</Link> | <Link to="/favoritos">Favoritos</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
