import { useContext } from "react";
import CartProvider  from "../context/cart/CartContext";

// Create a custom hook to access the cart context
export const useCart = () => {
    return useContext(CartProvider);
};