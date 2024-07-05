import React from "react";

const CartView = ({
  cart,
  getTotalPrice,
  increaseQuantity,
  decreaseQuantity,
  handleCheckout,
}) => (
  <div>
    <h2>Your Cart</h2>
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
      Checkout
    </button>
  </div>
);

export default CartView;
