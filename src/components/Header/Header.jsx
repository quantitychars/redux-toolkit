import React from "react";
import { Heart, ShoppingCart, Search } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import "./Header.scss"; // глобальні стилі, не modules

import logo from "./imgs/Logo.png";

const navLinks = ["Landscapes", "Portraits", "Architecture", "Macro", "Urban"];

export default function Header() {
  const { count: cartCount } = useCart();
  const { count: favCount } = useFavorites();

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <a href="#" className="logo__link">
            <img src={logo} alt="logo" className="logo__image" />
          </a>
        </div>

        {/* центрове меню */}
        <nav className="header__nav">
          {navLinks.map((text) => (
            <a key={text} href="#" className="nav__link">
              {text}
            </a>
          ))}
        </nav>

        {/* пошук */}
        <div className="header__search">
          <Search size={18} className="header__search-icon" />
          <input
            type="text"
            placeholder="Search"
            className="header__search-input"
          />
        </div>

        {/* іконки праворуч */}
        <div className="header__actions">
          <button className="icon-btn">
            <Heart size={20} />
            {favCount > 0 && <span className="badge">{favCount}</span>}
          </button>
          <button className="icon-btn ml-2">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
