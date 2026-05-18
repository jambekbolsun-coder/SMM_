import { useState } from "react";
import "./Reviews.css";

const reviews = [
  {
    id: 1,
    name: "Айгерим Б.",
    company: "Кофейня «Арома»",
    avatar: "А",
    rating: 5,
    text: "SMM_KADR полностью изменили наш Instagram. За 2 месяца охват вырос в 4 раза, появились реальные клиенты. Команда всегда на связи и делает всё вовремя.",
    tag: "Пакет Standard",
  },
  {
    id: 2,
    name: "Нурлан К.",
    company: "AutoShop Bishkek",
    avatar: "Н",
    rating: 5,
    text: "Взяли расширенный пакет — результат превзошёл ожидания. Видео делают профессионально, таргет работает отлично. Продажи выросли на 60% за первый месяц.",
    tag: "Пакет Advanced",
  },
  {
    id: 3,
    name: "Жылдыз А.",
    company: "Beauty Studio",
    avatar: "Ж",
    rating: 5,
    text: "Обратилась за разовой съёмкой — теперь на постоянном обслуживании. Ребята реально понимают свою работу, контент живой и привлекательный.",
    tag: "Разовый → Месячный",
  },
  {
    id: 4,
    name: "Тимур М.",
    company: "FitLife Gym",
    avatar: "Т",
    rating: 5,
    text: "Профессиональная команда с чёткими KPI. Каждый месяц получаем отчёты, видим реальный рост. Рекомендую всем, кто хочет серьёзный SMM.",
    tag: "Пакет Advanced",
  },
  {
    id: 5,
    name: "Сабина Р.",
    company: "Kids Boutique",
    avatar: "С",
    rating: 5,
    text: "Очень довольна сотрудничеством! Сторис, Reels, посты — всё на высшем уровне. За месяц подписчики выросли с 800 до 4200. Спасибо команде!",
    tag: "Пакет Standard",
  },
  {
    id: 6,
    name: "Бакыт О.",
    company: "Restaurant «Ош»",
    avatar: "Б",
    rating: 5,
    text: "Взяли базовый пакет для теста — результат понравился. Сейчас на месячном пакете. Видео-контент выглядит очень достойно, клиенты часто говорят что нашли нас в Instagram.",
    tag: "Basic → Standard",
  },
];

function Stars({ count }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`star ${i <= count ? "star--filled" : ""}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((p) => (p === 0 ? reviews.length - 1 : p - 1));

  const next = () =>
    setActive((p) => (p === reviews.length - 1 ? 0 : p + 1));

  const r = reviews[active];

  return (
    <section className="reviews" id="reviews">
      <div className="reviews__container">
        <div className="section-label">Отзывы</div>

        <div className="reviews__header">
          <h2 className="reviews__title">
            Что говорят наши <span className="blue">клиенты</span>
          </h2>
          <p className="reviews__sub">Реальные результаты. Реальные отзывы.</p>
        </div>

        {/* STATS ROW */}
        <div className="reviews__stats">
          <div className="reviews__stat">
            <span className="reviews__stat-num">120+</span>
            <span className="reviews__stat-label">Выполненных проектов</span>
          </div>

          <div className="reviews__stat-divider" />

          <div className="reviews__stat">
            <span className="reviews__stat-num">98%</span>
            <span className="reviews__stat-label">Уровень удовлетворённости</span>
          </div>

          <div className="reviews__stat-divider" />

          <div className="reviews__stat">
            <span className="reviews__stat-num">5.0</span>
            <span className="reviews__stat-label">Средний рейтинг</span>
          </div>
        </div>

        {/* MAIN REVIEW CARD */}
        <div className="reviews__spotlight">
          <div className="reviews__card-main">
            <div className="reviews__card-top">
              <div className="reviews__avatar">{r.avatar}</div>

              <div>
                <div className="reviews__name">{r.name}</div>
                <div className="reviews__company">{r.company}</div>
              </div>

              <div className="reviews__tag">{r.tag}</div>
            </div>

            <Stars count={r.rating} />

            <p className="reviews__text">"{r.text}"</p>
          </div>

          {/* CONTROLS */}
          <div className="reviews__controls">
            <button className="reviews__arrow" onClick={prev}>
              ←
            </button>

            <div className="reviews__dots">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  className={`reviews__dot ${
                    i === active ? "active" : ""
                  }`}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>

            <button className="reviews__arrow" onClick={next}>
              →
            </button>
          </div>
        </div>

        {/* MINI GRID */}
        <div className="reviews__grid">
          {reviews.map((rev, i) => (
            <div
              key={rev.id}
              className={`reviews__mini ${
                i === active ? "reviews__mini--active" : ""
              }`}
              onClick={() => setActive(i)}
            >
              <div className="reviews__mini-top">
                <div className="reviews__mini-avatar">{rev.avatar}</div>

                <div>
                  <div className="reviews__mini-name">{rev.name}</div>
                  <Stars count={rev.rating} />
                </div>
              </div>

              <p className="reviews__mini-text">
                {rev.text.slice(0, 80)}…
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}