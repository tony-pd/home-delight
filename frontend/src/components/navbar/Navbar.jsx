import { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { FaOpencart } from "react-icons/fa";
import { useCart } from "../../hooks/useCart";
import "./navbar.css";
import AuthContext from "../../context/cart/AuthContext";

const Navbar = ({ categories }) => {
  const { totalQuantity } = useCart();
  const { authState } = useContext(AuthContext);

  return (
    <div className="navbar">
      <nav className="nav">
        <div className="nav-left">
          <ul className="nav-items">
            {categories &&
              categories.map((category, index) => {
                return (
                  <li key={`category-${index}`} className="nav-item">                 
                    <HashLink smooth to={`#${category.value}`} className="nav-link">{category.label}</HashLink>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="nav-right">
          {authState.loggedIn && <p>Hi {authState.username}</p>}
          <Link to="/cart" className="cart-icon-container">
            <FaOpencart className="cart-icon" />
            {!!totalQuantity && (
              <>
                <div className="cart-badge">{totalQuantity}</div>
              </>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default memo(Navbar);
