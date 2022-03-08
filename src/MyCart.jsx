import { useCart } from "../cart-context";

export const MyCart = () => {
  const { cartItems, addToCart, decrementFromCart, removeFromCart } = useCart();
  return (
    <div>
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
};
