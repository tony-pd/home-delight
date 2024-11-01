import React from "react";
import { useCart } from "../../hooks/useCart";
import "./addToCart.css";

const AddToCart = ({ product }) => {

  const { cart, addToCart, removeFromCart } = useCart();

  const itemInCart = cart[product.id];
  const quantity = itemInCart ? itemInCart.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="add-to-cart">
      {
        itemInCart ? (
          <>
            <div onClick={handleRemoveFromCart} className="add remove">
              -
            </div>
            <div className="quantity">{quantity}</div>
            <div onClick={handleAddToCart} className="add">
              +
            </div>
          </>
        ): (
          <button onClick={handleAddToCart} className="add">
            Add to Cart
          </button>
        ) 
      }
    </div>
  );
}

export default AddToCart;
