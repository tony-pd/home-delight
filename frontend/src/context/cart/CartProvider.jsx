import { useState } from "react";
import CartContext from "./CartContext";
// Create a CartProvider component
const CartProvider = ({ children }) => {
    // Initialize the cart state as an empty object
    const [cartState, setCartState] = useState({});
    const [totalQuantity, setTotalQuantity] = useState(0); // Initialize to 0
  
    // Define functions to interact with the cart
    const addToCart = (product) => {
      // Create a copy of the cart state
      const updatedCart = { ...cartState };
    
      if (updatedCart[product.id]) {
        // If the product is already in the cart, increase the quantity
        updatedCart[product.id].quantity += 1;
      } else {
        // If the product is not in the cart, add it with a quantity of 1
        updatedCart[product.id] = { ...product, quantity: 1 };
      }

      // Update totalQuantity when adding to the cart
      setTotalQuantity(totalQuantity + 1);
    
      // Update the cart state
      setCartState(updatedCart);
    };
    const removeFromCart = (productId) => {
        // Create a copy of the cart state
        const updatedCart = { ...cartState };
      
        if (updatedCart[productId]) {
          // If the product is in the cart, decrease the quantity
          updatedCart[productId].quantity -= 1;
      
          // If the quantity reaches zero, remove the product entirely
          if (updatedCart[productId].quantity <= 0) {
            delete updatedCart[productId];
          }

          // Update totalQuantity when removing from the cart
          setTotalQuantity(totalQuantity - 1);
        }
      
        // Update the cart state
        setCartState(updatedCart);
      };
    
      // Create an object with the cart state and functions
    const cartContextValue = {
        cart: cartState,
        totalQuantity,
        addToCart,
        removeFromCart,
    };
    
    // Provide the context value to the components
    return (
        <CartContext.Provider value={cartContextValue}>
          {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
      