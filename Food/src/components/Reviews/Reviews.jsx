import { useState } from "react";
import "./Reviews.css";

const defaultReviews = [
  {
    id: 1,
    name: "Айгерим Б.",
    company: "Кофейня «Арома»",
    avatar: "А",
    rating: 5,
    likes: 12,
    date: "19.05.2026",
    text: "SMM_KADR полностью изменили наш Instagram. За 2 месяца охват вырос в 4 раза, появились реальные клиенты. Команда всегда на связи и делает всё вовремя.",
    tag: "Пакет Standard",
  },
  {
    id: 2,
    name: "Нурлан К.",
    company: "AutoShop Bishkek",
    avatar: "Н",
    rating: 5,
    likes: 9,
    date: "18.05.2026",
    text: "Взяли расширенный пакет — результат превзошёл ожидания. Видео делают профессионально, таргет работает отлично. Продажи выросли на 60% за первый месяц.",
    tag: "Пакет Advanced",
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
  const [expanded, setExpanded] = useState({});

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("reviews");
    return saved ? JSON.parse(saved) : defaultReviews;
  });

  const [liked, setLiked] = useState(() => {
    return JSON.parse(localStorage.getItem("liked")) || {};
  });

  const [toDelete, setToDelete] = useState(null);
  const [deletedBackup, setDeletedBackup] = useState(null);
  const [showUndo, setShowUndo] = useState(false);

  const [newReview, setNewReview] = useState({
    name: "",
    company: "",
    text: "",
    rating: 5,
  });

  function saveReviews(updated) {
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
  }

  // ⭐ LIKE (1 раз на человека)
  function likeReview(id) {
    const updated = { ...liked };

    const reviewsUpdated = reviews.map((r) => {
      if (r.id === id) {
        if (updated[id]) {
          delete updated[id];
          return { ...r, likes: r.likes - 1 };
        } else {
          updated[id] = true;
          return { ...r, likes: r.likes + 1 };
        }
      }
      return r;
    });

    setLiked(updated);
    localStorage.setItem("liked", JSON.stringify(updated));
    saveReviews(reviewsUpdated);
  }

  function addReview(e) {
    e.preventDefault();

    if (!newReview.name || !newReview.company || !newReview.text) return;

    const review = {
      id: Date.now(),
      name: newReview.name,
      company: newReview.company,
      avatar: newReview.name.charAt(0),
      rating: newReview.rating,
      likes: 0,
      date: new Date().toLocaleDateString("ru-RU"),
      text: newReview.text,
      tag: "Новый отзыв",
    };

    const updated = [review, ...reviews];
    saveReviews(updated);

    setNewReview({
      name: "",
      company: "",
      text: "",
      rating: 5,
    });

    setActive(0);
  }

  // 🗑 DELETE FLOW
  function confirmDelete(id) {
    setToDelete(id);
    setDeletedBackup(reviews.find((r) => r.id === id));
  }

  function deleteReview() {
    if (toDelete === null) return;

    const deletedIndex = reviews.findIndex((r) => r.id === toDelete);
    const updated = reviews.filter((r) => r.id !== toDelete);

    const nextActive = updated.length === 0
      ? 0
      : deletedIndex < active
      ? active - 1
      : active >= updated.length
      ? updated.length - 1
      : active;

    saveReviews(updated);
    setActive(nextActive);
    setToDelete(null);
    setShowUndo(true);

    setTimeout(() => {
      setShowUndo(false);
      setDeletedBackup(null);
    }, 5000);
  }

  function undoDelete() {
    if (!deletedBackup) return;

    const updated = [deletedBackup, ...reviews];
    saveReviews(updated);

    setShowUndo(false);
    setDeletedBackup(null);
  }

  const prev = () =>
    setActive((p) => (p === 0 ? reviews.length - 1 : p - 1));

  const next = () =>
    setActive((p) => (p === reviews.length - 1 ? 0 : p + 1));

  const r = reviews[active] || reviews[0] || null;

  return (
    <section className="reviews" id="reviews">
      <div className="reviews__container">

        <div className="section-label">Отзывы</div>

        <div className="reviews__header">
          <h2 className="reviews__title">
            Что говорят наши <span className="blue">клиенты</span>
          </h2>
          <p className="reviews__sub">
            Реальные результаты. Реальные отзывы.
          </p>
        </div>

        {/* MAIN */}
        <div className="reviews__spotlight">
          <div className="reviews__card-main">
            {!r ? (
              <div className="reviews__empty">Нет отзывов.</div>
            ) : (
              <>
                <div className="reviews__card-top">
                  <div className="reviews__avatar">{r.avatar}</div>

                  <div>
                    <div className="reviews__name">{r.name}</div>
                    <div className="reviews__company">{r.company}</div>

                    <div className="reviews__date">
                      Отзыв опубликован: {r.date}
                    </div>
                  </div>

                  <div className="reviews__tag">{r.tag}</div>
                </div>

                <Stars count={r.rating} />

                <p className="reviews__text">
                  {expanded[r.id]
                    ? r.text
                    : `${r.text.slice(0, 180)}...`}
                </p>

                {r.text.length > 180 && (
                  <button
                    className="reviews__more"
                    onClick={() =>
                      setExpanded((prev) => ({
                        ...prev,
                        [r.id]: !prev[r.id],
                      }))
                    }
                  >
                    {expanded[r.id] ? "Скрыть" : "Подробнее"}
                  </button>
                )}

                <div className="reviews__actions">
                  <button
                    className="reviews__like"
                    onClick={() => likeReview(r.id)}
                  >
                    ❤️ {r.likes}
                  </button>

                  <button
                    className="reviews__delete"
                    onClick={() => confirmDelete(r.id)}
                  >
                    🗑 Удалить
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* CONTROLS */}
        <div className="reviews__controls">
          <button className="reviews__arrow" onClick={prev}>←</button>

          <div className="reviews__dots">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`reviews__dot ${i === active ? "active" : ""}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>

          <button className="reviews__arrow" onClick={next}>→</button>
        </div>

        {/* MINI */}
        <div className="reviews__grid">
          {reviews.map((rev, i) => (
            <div
              key={rev.id}
              className={`reviews__mini ${i === active ? "reviews__mini--active" : ""}`}
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
                {rev.text.slice(0, 80)}...
              </p>

              <div className="reviews__mini-bottom">
                <span>❤️ {rev.likes}</span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* FORM (оставил твой как есть) */}
        <div className="reviews__form-wrap">
          <h3 className="reviews__form-title">Оставить отзыв</h3>

          <form className="reviews__form" onSubmit={addReview}>
            <input
              type="text"
              placeholder="Ваше имя"
              className="reviews__input"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Компания"
              className="reviews__input"
              value={newReview.company}
              onChange={(e) =>
                setNewReview({ ...newReview, company: e.target.value })
              }
            />

            <textarea
              placeholder="Ваш отзыв"
              className="reviews__textarea"
              rows={5}
              value={newReview.text}
              onChange={(e) =>
                setNewReview({ ...newReview, text: e.target.value })
              }
            />

            <button type="submit" className="reviews__submit">
              Отправить отзыв →
            </button>
          </form>
        </div>

        {/* MODAL DELETE */}
        {toDelete && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Удалить отзыв?</h3>
              <p>Действие можно отменить через undo</p>

              <div className="modal-actions">
                <button onClick={() => setToDelete(null)}>
                  Отмена
                </button>

                <button onClick={deleteReview}>
                  Удалить
                </button>
              </div>
            </div>
          </div>
        )}

        {/* UNDO */}
        {showUndo && (
          <div className="undo-bar">
            <span>Отзыв удалён</span>
            <button onClick={undoDelete}>Восстановить</button>
          </div>
        )}

      </div>
    </section>
  );
}