import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext.jsx"; // Adjust the path accordingly
import CheckoutForm from "./CheckoutForm.jsx";
import CartView from "./CartView.jsx";
import "./Cart.css";

const CartModal = ({ isOpen, onClose }) => {
  const { cart, increaseQuantity, decreaseQuantity, clearCart } = useContext(CartContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [enteredValues, setEnteredValues] = useState({
    fullname: "",
    email: "",
    street: "",
    postalcode: "",
    city: "",
  });

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    setTotalPrice(getTotalPrice());
    setIsFormVisible(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate a successful purchase
    clearCart();
    onClose(); // Close modal after successful submission
  };

  const handleInputChange = (identifier, value) => {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="cart-modal">
      <div className="cart-modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {isFormVisible ? (
          <CheckoutForm
            totalPrice={totalPrice}
            enteredValues={enteredValues}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            onClose={onClose}
          />
        ) : (
          <CartView
            cart={cart}
            getTotalPrice={getTotalPrice}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            handleCheckout={handleCheckout}
          />
        )}
      </div>
    </div>
  );
};

export default CartModal;
