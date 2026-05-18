import { useState } from "react";
import "./modal.css";

export default function ModalPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    business: "",
    package: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function update(field, val) {
    setForm((prev) => ({ ...prev, [field]: val }));
  }

  function nextStep() {
    if (step < 3) setStep((s) => s + 1);
  }

  function prevStep() {
    if (step > 1) setStep((s) => s - 1);
  }

  function submit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="modal-page">
        <div className="modal-page__container">
          <div className="am-success">
            <div className="am-success__icon">🚀</div>
            <h2>Спасибо за заявку!</h2>
            <p>Мы свяжемся с вами в течение 1 часа.</p>
            <button
              className="am-success__btn"
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setForm({ name: "", phone: "", business: "", package: "", message: "" });
              }}
            >
              Отправить ещё заявку
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="modal-page">
      <div className="modal-page__container">
        <div className="am-modal am-modal--page">
          {/* Progress */}
          <div className="am-progress">
            {[1, 2, 3].map((s) => (
              <div key={s} className="am-progress__step">
                <div className={`am-progress__dot ${step >= s ? "active" : ""} ${step > s ? "done" : ""}`}>
                  {step > s ? "✓" : s}
                </div>
                {s < 3 && <div className={`am-progress__line ${step > s ? "active" : ""}`} />}
              </div>
            ))}
          </div>

          <div className="am-head">
            <p className="am-tag">Оставить заявку</p>
            <h2 className="am-title">
              {step === 1 && "О вас"}
              {step === 2 && "Ваш бизнес"}
              {step === 3 && "Детали проекта"}
            </h2>
            <p className="am-sub">
              {step === 1 && "Как к вам обращаться и как с вами связаться?"}
              {step === 2 && "Расскажите немного о вашем бизнесе."}
              {step === 3 && "Что хотите получить в результате?"}
            </p>
          </div>

          <form className="am-form" onSubmit={submit}>
            {/* Step 1 */}
            {step === 1 && (
              <div className="am-fields">
                <div className="am-field">
                  <label className="am-label">Ваше имя *</label>
                  <input
                    className="am-input"
                    type="text"
                    placeholder="Айгерим"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                  />
                </div>
                <div className="am-field">
                  <label className="am-label">Номер телефона *</label>
                  <input
                    className="am-input"
                    type="tel"
                    placeholder="+996 500 000 000"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="am-fields">
                <div className="am-field">
                  <label className="am-label">Название бизнеса *</label>
                  <input
                    className="am-input"
                    type="text"
                    placeholder="Например: Кофейня «Арома»"
                    value={form.business}
                    onChange={(e) => update("business", e.target.value)}
                    required
                  />
                </div>
                <div className="am-field">
                  <label className="am-label">Интересующий пакет</label>
                  <select
                    className="am-input"
                    value={form.package}
                    onChange={(e) => update("package", e.target.value)}
                  >
                    <option value="">Выберите пакет</option>
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="am-fields">
                <div className="am-field">
                  <label className="am-label">Расскажите о вашем проекте</label>
                  <textarea
                    className="am-input am-textarea"
                    placeholder="Что вам нужно?"
                    rows={5}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="am-controls">
              {step > 1 && (
                <button type="button" className="am-btn am-btn--secondary" onClick={prevStep}>
                  ← Назад
                </button>
              )}

              {step < 3 ? (
                <button type="button" className="am-btn am-btn--primary" onClick={nextStep}>
                  Далее →
                </button>
              ) : (
                <button type="submit" className="am-btn am-btn--primary">
                  Отправить заявку
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
