import React, { useState } from "react";
import { db } from "./FirebaseConfig";
import { ref, set, get, update, remove, child } from "firebase/database";
import "./Cart.css";

const CheckoutForm = ({ totalPrice, onClose }) => {
  const [enteredValues, setEnteredValues] = useState({
    fullname: "",
    email: "",
    street: "",
    postalcode: "",
    city: "",
  });
  const [isPurchaseSuccessful, setIsPurchaseSuccessful] = useState(false);

  const handleInputChange = (field, value) => {
    setEnteredValues({ ...enteredValues, [field]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const orderId = new Date().getTime().toString(); // Generate a unique ID for the order
    addData(orderId);
  };

  const addData = (orderId) => {
    set(ref(db, "Orders/" + orderId), {
      fullname: enteredValues.fullname,
      email: enteredValues.email,
      street: enteredValues.street,
      postalcode: enteredValues.postalcode,
      city: enteredValues.city,
      totalPrice: totalPrice,
    })
      .then(() => {
        setIsPurchaseSuccessful(true); // Set purchase successful state
        alert("Order submitted successfully");
      })
      .catch((error) => {
        alert("Order submission unsuccessful");
        console.error(error);
      });
  };

  const retData = (orderId) => {
    const dbRef = ref(db);
    get(child(dbRef, "Orders/" + orderId))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setEnteredValues({
            fullname: data.fullname,
            email: data.email,
            street: data.street,
            postalcode: data.postalcode,
            city: data.city,
          });
          alert("Order retrieved successfully");
        } else {
          alert("Order does not exist");
        }
      })
      .catch((error) => {
        alert("Retrieval unsuccessful");
        console.error(error);
      });
  };

  const updateData = (orderId) => {
    update(ref(db, "Orders/" + orderId), {
      fullname: enteredValues.fullname,
      email: enteredValues.email,
      street: enteredValues.street,
      postalcode: enteredValues.postalcode,
      city: enteredValues.city,
      totalPrice: totalPrice,
    })
      .then(() => {
        alert("Order updated successfully");
      })
      .catch((error) => {
        alert("Order update unsuccessful");
        console.error(error);
      });
  };

  const deleteData = (orderId) => {
    remove(ref(db, "Orders/" + orderId))
      .then(() => {
        alert("Order deleted successfully");
        setEnteredValues({
          fullname: "",
          email: "",
          street: "",
          postalcode: "",
          city: "",
        });
      })
      .catch((error) => {
        alert("Order deletion unsuccessful");
        console.error(error);
      });
  };

  return (
    <div>
      {isPurchaseSuccessful ? (
        <div>
          <h2 className="check-out">Purchase Successful!</h2>
          <p>Your order has been placed successfully.</p>
          <button onClick={onClose} style={{ marginTop: "10px" }}>
            Close
          </button>
        </div>
      ) : (
        <div>
          <h2 className="check-out">Check Out</h2>
          <h3>Total Price: ${totalPrice}</h3>
          <form onSubmit={handleSubmit}>
            <div className="control no-margin">
              <label>Full Name</label> <br />
              <input
                type="text"
                required
                onChange={(event) =>
                  handleInputChange("fullname", event.target.value)
                }
                value={enteredValues.fullname}
              />
              <br />
            </div>

            <div className="control no-margin">
              <label>Email Address</label> <br />
              <input
                type="email"
                required
                onChange={(event) =>
                  handleInputChange("email", event.target.value)
                }
                value={enteredValues.email}
              />
              <br />
            </div>

            <div className="control no-margin">
              <label>Street</label> <br />
              <input
                type="text"
                required
                onChange={(event) =>
                  handleInputChange("street", event.target.value)
                }
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
                  onChange={(event) =>
                    handleInputChange("city", event.target.value)
                  }
                  value={enteredValues.city}
                />
              </section>
            </div>

            <div className="submit-button">
              <button type="button" onClick={onClose} className="close">
                Close
              </button>
              <button type="submit" className="submit">
                Submit Order
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
