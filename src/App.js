import { useState } from "react";
import { itemsInCart } from "./itemsInCart";
import "./styles.css";

export default function App() {
  const [items, setItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  // const [quant, setQuant] = useState(itemsInCart);

  const filterItems = (items, id) => items.filter((it) => it.id === id);

  const addToCart = (itemId, price) => {
    setItems(items + 1);
    setTotalPrice(totalPrice + price);
    // setCartItems([...cartItems, item]);
    let updatedCart;
    if (filterItems(cartItems, itemId).length > 0) {
      updatedCart = cartItems.map((it) => {
        if (it.id === itemId) {
          return { ...it, quantity: it.quantity + 1 };
        } else {
          return it;
        }
      });
    } else {
      let item = filterItems(itemsInCart, itemId)[0];
      updatedCart = [...cartItems, item];
    }
    setCartItems(updatedCart);
  };

  const removeFromCart = ({ item }) => {
    let updatedCart = cartItems.filter((it) => {
      return it.id !== item.id;
    });
    setCartItems(updatedCart);
  };

  const decrementFromCart = (itemId) => {
    let updatedCart = cartItems.reduce((acc, item) => {
      if (item.id === itemId) {
        if (item.quantity > 1) {
          acc.push({ ...item, quantity: item.quantity - 1 });
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
    setCartItems(updatedCart);
  };
  return (
    <div className="App">
      <h1>Cart Items</h1>
      <h2>Total Items: {items} </h2>
      <h2>Total Price: {totalPrice} </h2>
      {itemsInCart.map((item) => {
        return (
          <div key={item.id}>
            <span>
              {item.name} || {item.price}
            </span>
            <button onClick={() => addToCart(item.id, item.price)}>
              Add to Cart
            </button>
            <hr />
          </div>
        );
      })}
      <h1>My Cart: </h1>
      {cartItems.map((item) => {
        return (
          <div key={item.id} style={{ marginRight: "1.5rem" }}>
            <span>{item.name}</span>
            <span style={{ marginLeft: "1rem" }}>
              Quantity: {item.quantity}
            </span>
            <button
              style={{ marginLeft: "0.5rem" }}
              onClick={() => addToCart(item.id, item.price)}
            >
              +
            </button>
            <button
              style={{ marginLeft: "0.5rem" }}
              onClick={() => decrementFromCart(item.id)}
            >
              -
            </button>
            <button
              style={{ marginLeft: "0.5rem" }}
              onClick={() => removeFromCart({ item })}
            >
              Remove from Cart
            </button>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
