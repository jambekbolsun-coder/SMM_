import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useLanguage } from "../../context/LanguageContext.jsx";

const navLinks = [
  { key: "header_home", to: "/" },
  { key: "header_services", to: "/services" },
  { key: "header_about", to: "/about" },
  { key: "header_reviews", to: "/reviews" },
  { key: "header_team", to: "/team" },
  { key: "header_contacts", to: "/contacts" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    if (password === "smmkadr2024") {
      navigate("/cabinet");
    } else {
      setError(true);
    }
  };

  return (
    <>
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="header__inner">

          {/* LOGO */}
          <Link
            className="header__logo"
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            <div className="header__logo-text">
              <span className="logo-smm">SMM</span>
              <span className="logo-kadr">_KADR</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="header__nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `header__nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {t(link.key)}
                <span className="nav-underline" />
              </NavLink>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="header__actions">
<div className="header__lang-select"> <select value={language} onChange={(e) => setLanguage(e.target.value)} className="header__select" > <option value="kg">🇰🇬 KG</option> <option value="ru">🇷🇺 RU</option> <option value="en">🇺🇸 EN</option> </select> </div>

            <button
              className="header__reviews"
              onClick={() => navigate("/modal")}
            >
              {t("header_request")}
            </button>

            {/* BURGER */}
            <button
              className={`burger ${menuOpen ? "burger--open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t("header_menu_aria")}
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
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `mobile-menu__link ${isActive ? "active" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {t(link.key)}
              </NavLink>
            ))}
            <NavLink
              to="/privacy"
              className={({ isActive }) =>
                `mobile-menu__link ${isActive ? "active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              Политика конфиденциальности
            </NavLink>
            <NavLink
              to="/terms"
              className={({ isActive }) =>
                `mobile-menu__link ${isActive ? "active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              Условия использования
            </NavLink>
          </nav>
          <div className="mobile-menu__actions">
            <button
              className="mobile-menu__request-btn"
              onClick={() => {
                setMenuOpen(false);
                navigate("/modal");
              }}
            >
              {t("header_request")}
            </button>
          </div>
        </div>
      </header>

    </>
  );
}