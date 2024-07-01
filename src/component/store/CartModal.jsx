import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext"; // Adjust the path accordingly
import "./Cart.css";

const CartModal = ({ isOpen, onClose }) => {
  const { cart, increaseQuantity, decreaseQuantity, clearCart } = useContext(CartContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isPurchaseSuccessful, setIsPurchaseSuccessful] = useState(false);
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
    setIsPurchaseSuccessful(true);
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
        {isPurchaseSuccessful ? (
          <div>
            <h2 className="check-out" >Purchase Successful!</h2>
            <p>Your order has been placed successfully.</p>
            <button onClick={onClose} style={{ marginTop: "10px"}}>Close</button>
          </div>
        ) : isFormVisible ? (
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

const CheckoutForm = ({
  totalPrice,
  enteredValues,
  handleInputChange,
  handleSubmit,
  onClose,
}) => (
  <div>
    <h2 className="check-out">Check Out</h2>
    <h3>Total Price: ${totalPrice}</h3>
    <form onSubmit={handleSubmit}>
      <div className="control no-margin">
        <label>Full Name</label> <br />
        <input
          type="text"
          required
          onChange={(event) => handleInputChange("fullname", event.target.value)}
          value={enteredValues.fullname}
        />
        <br />
      </div>

      <div className="control no-margin">
        <label>Email Address</label> <br />
        <input
          type="email"
          required
          onChange={(event) => handleInputChange("email", event.target.value)}
          value={enteredValues.email}
        />
        <br />
      </div>

      <div className="control no-margin">
        <label>Street</label> <br />
        <input
          type="text"
          required
          onChange={(event) => handleInputChange("street", event.target.value)}
          value={enteredValues.street}
        />
        <br />
      </div>

      <div className="label-address">
        <section>
          <label>Postal Code</label>
          <input
            type="text"
            required
            onChange={(event) =>
              handleInputChange("postalcode", event.target.value)
            }
            value={enteredValues.postalcode}
          />
        </section>
        <section>
          <label>City</label>
          <input
            type="text"
            required
            onChange={(event) => handleInputChange("city", event.target.value)}
            value={enteredValues.city}
          />
        </section>
      </div>

      <div className="submit-button">
        <button onClick={onClose} className="close">
          Close
        </button>
        <button type="submit" className="submit">
          Submit Order
        </button>
      </div>
    </form>
  </div>
);

const CartView = ({
  cart,
  getTotalPrice,
  increaseQuantity,
  decreaseQuantity,
  handleCheckout,
}) => (
  <>
    <h2 className="cart-title">Cart</h2>
    <ul>
      {cart.map((item, index) => (
        <li key={index}>
          <div>
            <h3 className="fname">{item.fname}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
          </div>
          <div className="quantity-controls">
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.id)}>+</button>
          </div>
        </li>
      ))}
    </ul>
    <h3>Total Price: ${getTotalPrice()}</h3>
    <button className="checkout-button" onClick={handleCheckout}>
      Check-Out
    </button>
  </>
);

export default CartModal;
