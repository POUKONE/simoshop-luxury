import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './GlobalStyles';
import { CartProvider } from './context/CartContext';

// Import des Composants qui EXISTENT réellement
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartPage from './pages/CartPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <GlobalStyles />
        <Navbar /> 
        
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/catalogue" element={<ProductGrid />} />
          <Route path="/panier" element={<CartPage />} />
          
         
        </Routes>
        
      </Router>
    </CartProvider>
  );
}

export default App;