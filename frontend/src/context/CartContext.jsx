import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // On récupère le panier stocké dans le navigateur au chargement
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('ss_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sauvegarde automatique dans le navigateur à chaque changement
  useEffect(() => {
    localStorage.setItem('ss_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const isAlreadyIn = prev.find(item => item.id === product.id);
      if (isAlreadyIn) return prev; // On évite les doublons pour le moment
      return [...prev, product];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalAmount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);