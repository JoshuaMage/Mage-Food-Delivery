import React, { useContext, useState } from 'react';
import logo from "../../../public/logo.jpg";
import { CartContext } from '../store/CartContext'; // Adjust the path accordingly
import CartModal from '../store/CartModal';// Adjust the path accordingly
import "./header.css";

export default function Header() {
  const { cart } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div id="header">
      <img src={logo} alt="logo" className="logo" />
      <h1>Mage Delivery</h1>
      <button className="cart" onClick={toggleCart}>
        Cart ({cart.length})
      </button>
      <input type="search" placeholder="search..." className="header-input" />
      <CartModal isOpen={isCartOpen} onClose={toggleCart} />
    </div>
  );
}
