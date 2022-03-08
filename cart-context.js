import { createContext, useContext, useState } from "react";
import { itemsInCart } from "./src/itemsInCart";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [items, setItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

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
    <CartContext.Provider
      value={{
        items,
        totalPrice,
        addToCart,
        decrementFromCart,
        removeFromCart,
        cartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
