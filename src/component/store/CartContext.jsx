import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const increaseQuantity = (itemId) => {
    setCart(cart.map(cartItem => 
      cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    ));
  };

  const decreaseQuantity = (itemId) => {
    setCart(cart.map(cartItem => 
      cartItem.id === itemId && cartItem.quantity > 1 ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
