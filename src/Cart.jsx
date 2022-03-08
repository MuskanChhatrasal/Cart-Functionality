import { useCart } from "../cart-context";
import { itemsInCart } from "./itemsInCart";

export const Cart = () => {
  const { items, totalPrice, addToCart } = useCart();
  return (
    <div>
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
    </div>
  );
};
