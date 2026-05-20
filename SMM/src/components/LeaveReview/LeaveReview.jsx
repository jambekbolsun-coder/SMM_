import { useState } from "react";
import "./LeaveReview.css";

export default function LeaveReview() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [form, setForm] = useState({ name: "", company: "", text: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.text || rating === 0) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="lreview" id="leave-review">
        <div className="lreview__container">
          <div className="lreview__success">
            <div className="lreview__success-icon">✓</div>
            <h3>Спасибо за ваш отзыв!</h3>
            <p>Ваше мнение помогает нам становиться лучше.</p>
            <button
              className="lreview__reset"
              onClick={() => {
                setSubmitted(false);
                setForm({ name: "", company: "", text: "" });
                setRating(0);
              }}
            >
              Оставить ещё отзыв
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="lreview" id="leave-review">
      <div className="lreview__container">
        <div className="section-label">Отзывы</div>

        <div className="lreview__header">
          <h2 className="lreview__title">
            Поделитесь своим <span className="blue">опытом</span>
          </h2>
          <p className="lreview__sub">
            Работали с нами? Нам будет приятно услышать ваше мнение.
          </p>
        </div>

        <div className="lreview__card">
          {/* RATING */}
          <div className="lreview__rating-section">
            <label className="lreview__label">Ваша оценка</label>
            <div className="lreview__stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  className={`lreview__star ${
                    i <= (hover || rating) ? "lreview__star--active" : ""
                  }`}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(i)}
                >
                  ★
                </button>
              ))}
            </div>

            {rating > 0 && (
              <span className="lreview__rating-text">
                {["", "Плохо", "Нормально", "Хорошо", "Отлично", "Превосходно!"][rating]}
              </span>
            )}
          </div>

          {/* FIELDS */}
          <div className="lreview__fields">
            <div className="lreview__row">
              <div className="lreview__field">
                <label className="lreview__label">Ваше имя *</label>
                <input
                  className="lreview__input"
                  placeholder="Айзат Маматова"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="lreview__field">
                <label className="lreview__label">Компания (необязательно)</label>
                <input
                  className="lreview__input"
                  placeholder="Название вашего бизнеса"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>
            </div>

            <div className="lreview__field">
              <label className="lreview__label">Ваш отзыв *</label>
              <textarea
                className="lreview__textarea"
                placeholder="Расскажите о вашем опыте работы с SMM_KADR..."
                rows={5}
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
              />
              <span className="lreview__char">{form.text.length}/500</span>
            </div>
          </div>

          <button
            className={`lreview__btn ${
              !form.name || !form.text || rating === 0
                ? "lreview__btn--disabled"
                : ""
            }`}
            onClick={handleSubmit}
          >
            Отправить отзыв →
          </button>
        </div>
      </div>
    </section>
  );
}