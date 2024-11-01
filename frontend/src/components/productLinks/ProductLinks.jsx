import { memo } from "react";
import { NavLink } from "react-router-dom";
import "./productLinks.css";

const ProductLinks = ({ categories }) => {
  return (
    <div id="menu" className="product-links">
      <nav className="nav">
        <div className="nav-left">
          <ul className="nav-items">
            {categories &&
              categories.map((category, index) => {
                return (
                  <li key={`category-${index}`} className="nav-item">
                    <NavLink to={`/${category}`} className="nav-link">
                      {category}
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default memo(ProductLinks);
