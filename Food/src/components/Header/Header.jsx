import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

const navLinks = [
  { label: "Главная", to: "/" },
  { label: "О нас", to: "/about" },
  { label: "Услуги", to: "/services" },
  { label: "Отзывы", to: "/reviews" },
  { label: "Контакты", to: "/contacts" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // LOGIN MODAL
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
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
                {link.label}
                <span className="nav-underline" />
              </NavLink>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="header__actions">
            <button
              className="header__cabinet-btn"
              onClick={() => setShowLogin(true)}
            >
              Личный кабинет
            </button>
            <button
              className="header__reviews"
              onClick={() => navigate("/modal")}
            >
              Оставить заявку
            </button>

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
        <div
          className={`mobile-menu ${
            menuOpen ? "mobile-menu--open" : ""
          }`}
        >
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
                {link.label}
              </NavLink>
            ))}

            <button
              className="mobile-menu__cabinet"
              onClick={() => {
                setShowLogin(true);
                setMenuOpen(false);
              }}
            >
              Личный кабинет
            </button>
          </nav>
        </div>
      </header>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="cabinet-modal">
          <div className="cabinet-modal__box">
            <h3 className="cabinet-modal__title">
              Вход в личный кабинет
            </h3>

            <input
              type="password"
              placeholder="Введите пароль"
              className="cabinet-modal__input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
            />

            {error && (
              <div className="cabinet-modal__error">
                Неверный пароль
              </div>
            )}

            <div className="cabinet-modal__actions">
              <button
                className="cabinet-modal__cancel"
                onClick={() => {
                  setShowLogin(false);
                  setPassword("");
                  setError(false);
                }}
              >
                Отмена
              </button>

              <button
                className="cabinet-modal__login"
                onClick={handleLogin}
              >
                Войти
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}