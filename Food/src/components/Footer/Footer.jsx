import "./Footer.css";

const navLinks = [
  { label: "Главная", href: "#home" },
  { label: "О нас", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const services = [
  "Стандарт пакет",
  "Расширенный пакет",
  "Базовый (разовый)",
  "Продвинутый (разовый)",
  "Таргетинг",
  "Контент и сценарии",
];

export default function Footer() {
  const handleNav = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer" id="footer">
      {/* TOP WAVE */}
      <div className="footer__wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            fill="#0f1f4b"
          />
        </svg>
      </div>

      <div className="footer__body">
        <div className="footer__container">

          {/* COL 1 — BRAND */}
          <div className="footer__col footer__col--brand">
            <div className="footer__logo">
              <span className="logo-smm">SMM</span>
              <span className="logo-kadr">_KADR</span>
            </div>
            <p className="footer__desc">
              Мы — команда специалистов по SMM и digital-маркетингу. Помогаем
              брендам расти в социальных сетях и привлекать клиентов.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="#" className="footer__social" aria-label="Telegram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/>
                </svg>
              </a>
              <a href="#" className="footer__social" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* COL 2 — NAV */}
          <div className="footer__col">
            <h4 className="footer__col-title">Навигация</h4>
            <ul className="footer__list">
              {navLinks.map((link) => (
                <li key={link.href}>
                 <a 
                    href={link.href}
                    className="footer__link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(link.href);
                    }}
                  >
                    <span className="footer__link-arrow">→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — SERVICES */}
          <div className="footer__col">
            <h4 className="footer__col-title">Услуги</h4>
            <ul className="footer__list">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="footer__link"
                    onClick={(e) => { e.preventDefault(); handleNav("#services"); }}>
                    <span className="footer__link-arrow">→</span>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4 — CONTACTS */}
          <div className="footer__col">
            <h4 className="footer__col-title">Контакты</h4>
            <ul className="footer__contacts-list">
              <li>
                <span className="footer__contact-icon">📍</span>
                <span>Бишкек, Кыргызстан</span>
              </li>
              <li>
                <span className="footer__contact-icon">📞</span>
                <a href="tel:+996700000000" className="footer__contact-link">
                  +996 700 000 000
                </a>
              </li>
              <li>
                <span className="footer__contact-icon">✉️</span>
                <a href="mailto:info@smmkadr.kg" className="footer__contact-link">
                  info@smmkadr.kg
                </a>
              </li>
              <li>
                <span className="footer__contact-icon">🕐</span>
                <span>Пн–Пт: 9:00 – 18:00</span>
              </li>
            </ul>

            <a href="#contacts" className="footer__cta"
              onClick={(e) => { e.preventDefault(); handleNav("#contacts"); }}>
              Связаться с нами
            </a>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} SMM_KADR. Все права защищены.
          </p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">Политика конфиденциальности</a>
            <span className="footer__dot">·</span>
            <a href="#" className="footer__bottom-link">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
}