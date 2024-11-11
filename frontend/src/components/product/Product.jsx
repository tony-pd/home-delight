import React from "react";
import './product.css';
import AddToCart from "../addToCart/AddToCart";

const Product = ({ product }) => (
  <div className="product-item">
    <img className="product-image" 
      src={product.image} 
      width={"100%"}
      height={"auto"}
      alt={product.title} />
    <div className="product-details">
      <div className="product-title">{product.title}</div>
      <div className="buy-item">
        <div className="product-price">Price: ${product.price}</div>
        <AddToCart product={product} />
      </div>
    </div>
  </div>
);

export default Product;
