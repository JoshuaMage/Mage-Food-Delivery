import React, { useContext } from "react";
import { FOOD_MENU } from "./container";
import { CartContext } from "../store/CartContext";
import "./container.css";

const MiddleContainer = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="food-menu">
      {FOOD_MENU.map((item) => (
        <div key={item.id} className="food-item">
          <section>
            <img src={item.img} alt={item.fname} className="food-image" />
            <h3>{item.fname}</h3>
            <p className="price-Item">${item.price}</p>
            <p className="description-item">{item.description}</p>
            <button onClick={() => addToCart(item)}>{item.button}</button>
          </section>
        </div>
      ))}
    </div>
  );
};

export default MiddleContainer;
