import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // On récupère le panier sauvegardé au chargement
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('simoshop_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sauvegarde automatique à chaque modification
  useEffect(() => {
    localStorage.setItem('simoshop_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (id) => {
    // Supprime seulement une instance du produit
    setCart((prev) => {
      const index = prev.findIndex(item => item.id === id);
      if (index > -1) {
        const newCart = [...prev];
        newCart.splice(index, 1);
        return newCart;
      }
      return prev;
    });
  };

  const clearCart = () => setCart([]);

  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);