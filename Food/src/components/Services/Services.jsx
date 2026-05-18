import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Services.css";

const monthly = [
  {
    id: "standard",
    badge: "Популярный",
    name: "STANDARD",
    price: "65 000",
    period: "/ месяц",
    videos: "8 видео/месяц",
    color: "#1a56db",
    features: [
      { label: "Маркетинговый отдел", price: "20 000" },
      { label: "Мобилограф", price: "15 000" },
      { label: "Амбассадор", price: "10 000" },
      { label: "Таргетолог", price: "7 000" },
      { label: "Проектный менеджер", price: "6 000" },
      { label: "Контент и сценарии", price: "7 000" },
    ],
  },
  {
    id: "advanced",
    badge: "Лучшая цена",
    name: "ADVANCED",
    price: "85 000",
    period: "/ месяц",
    videos: "8 видео/месяц",
    color: "#0f1f4b",
    features: [
      { label: "Всё из Standard", price: "65 000" },
      { label: "Сторисмейкер", price: "10 000" },
      { label: "Графический дизайнер", price: "10 000", note: "до 10 постов" },
    ],
    highlight: true,
  },
];

const onetime = [
  {
    id: "basic",
    badge: "Разовая услуга",
    name: "BASIC",
    price: "12 500",
    period: "разово",
    color: "#1a56db",
    features: [
      { label: "Амбассадор", price: "1 500" },
      { label: "Мобилограф", price: "2 500" },
      { label: "Маркетинговый отдел", price: "2 000" },
      { label: "Проектный менеджер", price: "1 500" },
      { label: "Таргетолог", price: "2 000" },
      { label: "Монтаж и публикация", price: "3 000" },
    ],
  },
  {
    id: "pro",
    badge: "Разовая услуга",
    name: "PRO",
    price: "15 000",
    period: "разово",
    color: "#0f1f4b",
    features: [
      { label: "Амбассадор", price: "1 500" },
      { label: "Мобилограф", price: "4 000" },
      { label: "Маркетинговый отдел", price: "2 500" },
      { label: "Проектный менеджер", price: "2 000" },
      { label: "Таргетолог", price: "2 000" },
      { label: "Монтаж и публикация", price: "3 000" },
    ],
    highlight: true,
  },
];

function PriceCard({ card }) {
  return (
    <div className={`price-card ${card.highlight ? "price-card--highlight" : ""}`}>
      {card.badge && (
        <div className="price-card__badge">{card.badge}</div>
      )}

      <div className="price-card__top">
        <span className="price-card__name">{card.name}</span>

        {card.videos && (
          <span className="price-card__videos">📹 {card.videos}</span>
        )}
      </div>

      <div className="price-card__price">
        <span className="price-card__amount">{card.price}</span>
        <span className="price-card__currency"> сом</span>
        <span className="price-card__period">{card.period}</span>
      </div>

      <ul className="price-card__features">
        {card.features.map((f, i) => (
          <li key={i} className="price-card__feature">
            <span className="price-card__feature-check">✓</span>

            <span className="price-card__feature-label">
              {f.label}
              {f.note && <em> ({f.note})</em>}
            </span>

            <span className="price-card__feature-price">
              {f.price} с
            </span>
          </li>
        ))}
      </ul>

      <button
        className="price-card__btn"
        onClick={() => navigate("/contacts")}
      >
        Начать →
      </button>
    </div>
  );
}

export default function Services() {
  const [tab, setTab] = useState("monthly");
  const navigate = useNavigate();

  return (
    <section className="services" id="services">
      <div className="services__container">
        <div className="section-label">Услуги</div>

        <div className="services__header">
          <h2 className="services__title">
            Выберите свой <span className="blue">пакет</span>
          </h2>

          <p className="services__sub">
            Прозрачные цены. Полная команда. Реальные результаты.
          </p>
        </div>

        {/* TABS */}
        <div className="services__tabs">
          <button
            className={`services__tab ${
              tab === "monthly" ? "active" : ""
            }`}
            onClick={() => setTab("monthly")}
          >
            Месячные пакеты
          </button>

          <button
            className={`services__tab ${
              tab === "onetime" ? "active" : ""
            }`}
            onClick={() => setTab("onetime")}
          >
            Разовые услуги
          </button>
        </div>

        {/* CARDS */}
        <div className="services__grid">
          {(tab === "monthly" ? monthly : onetime).map((card) => (
            <PriceCard key={card.id} card={card} />
          ))}
        </div>

        {/* BOTTOM NOTE */}
        <div className="services__note">
          <span>🔥</span>

          <span>
            Все пакеты включают полное управление проектом и ежемесячную
            отчётность. Свяжитесь с нами для индивидуального предложения.
          </span>
        </div>
      </div>
    </section>
  );
}