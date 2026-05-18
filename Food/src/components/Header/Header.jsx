import { useState, useEffect } from "react";
import "./Header.css";

const navLinks = [
  { label: "Главная", href: "#home" },
  { label: "О нас", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setActiveLink(href);
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="header__inner">
        {/* LOGO */}
        <a className="header__logo" href="#home" onClick={() => handleNavClick("#home")}>
          <span className="logo-smm">SMM</span>
          <span className="logo-kadr">_KADR</span>
        </a>
        

        {/* DESKTOP NAV */}
        <nav className="header__nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`header__nav-link ${activeLink === link.href ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
            >
              {link.label}
              <span className="nav-underline" />
            </a>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="header__actions">
          <a href="#cabinet" className="header__cabinet-btn">
            Личный кабинет
          </a>

          {/* BURGER */}
          <button
            className={`burger ${menuOpen ? "burger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <nav className="mobile-menu__nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`mobile-menu__link ${activeLink === link.href ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
          <a href="#cabinet" className="mobile-menu__cabinet" onClick={() => setMenuOpen(false)}>
            Личный кабинет
          </a>
        </nav>
      </div>
    </header>
  );
}