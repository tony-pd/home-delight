import './cartItem.css';

const CartItem = ({ cartData }) => {
  const { id, title, price, quantity, image } = cartData;
  const totalPrice = price * quantity;

  return (
    <div className="cart-item">
    <div className="cart-item-details">
        <div className="cart-item-image">
            <img src={"./products/" + image} alt={title} />
        </div>    
    </div>
    <h3 className="cart-item-name">{title}</h3>
    {<span className="cart-item-quantity">{quantity}</span>}
    {/* <div className="cart-item-quantity">
        <button
        className="quantity-button"
        onClick={() => handleQuantityChange(quantity - 1)}
        >
        -
        </button>
        <span className="quantity">{quantity}</span>
        <button
        className="quantity-button"
        onClick={() => handleQuantityChange(quantity + 1)}
        >
        +
        </button>
    </div> */}
    <div className="cart-item-total">
        <p className="cart-item-total-price">${totalPrice.toFixed(2)}</p>
    </div>
    </div>  
  );
};

export default CartItem;
