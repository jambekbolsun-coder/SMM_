import { useState, useEffect } from "react";
import "./modal.css";

export default function ApplicationModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", phone: "", business: "", package: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(1);
      setSubmitted(false);
      setForm({ name: "", phone: "", business: "", package: "", message: "" });
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

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

  return (
    <div className="am-overlay" onClick={onClose}>
      <div className="am-modal" onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button className="am-close" onClick={onClose}>✕</button>

        {!submitted ? (
          <>
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
                  <div className="am-socials-hint">
                    <span>Или напишите напрямую:</span>
                    <a href="https://wa.me/996503030018" target="_blank" rel="noreferrer" className="am-wa-link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.17 1.558 5.943L.057 23.571a.75.75 0 0 0 .915.937l5.85-1.53A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.705 9.705 0 0 1-4.95-1.355l-.355-.21-3.676.963.98-3.572-.23-.368A9.715 9.715 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                      </svg>
                      WhatsApp
                    </a>
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
                      placeholder="Ваш магазин / бренд / компания"
                      value={form.business}
                      onChange={(e) => update("business", e.target.value)}
                      required
                    />
                  </div>
                  <div className="am-field">
                    <label className="am-label">Интересующий пакет</label>
                    <div className="am-packages">
                      {[
                        { val: "basic",    label: "Базовый",     price: "12 500 сом", tag: "Разово" },
                        { val: "advanced", label: "Продвинутый", price: "15 000 сом", tag: "Разово" },
                        { val: "standard", label: "Стандарт",    price: "65 000 сом", tag: "Месяц" },
                        { val: "extended", label: "Расширенный", price: "85 000 сом", tag: "Месяц" },
                        { val: "consult",  label: "Нужна консультация", price: "Бесплатно", tag: "💬" },
                      ].map((p) => (
                        <div
                          key={p.val}
                          className={`am-pkg ${form.package === p.val ? "am-pkg--active" : ""}`}
                          onClick={() => update("package", p.val)}
                        >
                          <div className="am-pkg__top">
                            <span className="am-pkg__tag">{p.tag}</span>
                            {form.package === p.val && <span className="am-pkg__check">✓</span>}
                          </div>
                          <div className="am-pkg__name">{p.label}</div>
                          <div className="am-pkg__price">{p.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="am-fields">
                  <div className="am-field">
                    <label className="am-label">Расскажите о проекте</label>
                    <textarea
                      className="am-textarea"
                      rows={4}
                      placeholder="Чем занимается бизнес? Что хотите улучшить? Есть ли уже соцсети?"
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                    />
                  </div>
                  <div className="am-summary">
                    <p className="am-summary__title">Ваша заявка:</p>
                    <div className="am-summary__row">
                      <span>Имя</span><span>{form.name || "—"}</span>
                    </div>
                    <div className="am-summary__row">
                      <span>Телефон</span><span>{form.phone || "—"}</span>
                    </div>
                    <div className="am-summary__row">
                      <span>Бизнес</span><span>{form.business || "—"}</span>
                    </div>
                    <div className="am-summary__row">
                      <span>Пакет</span>
                      <span>{form.package ? form.package : "Не выбран"}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer buttons */}
              <div className="am-footer">
                {step > 1 && (
                  <button type="button" className="am-btn-back" onClick={prevStep}>
                    ← Назад
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    className="am-btn-next"
                    onClick={nextStep}
                    disabled={
                      (step === 1 && (!form.name || !form.phone)) ||
                      (step === 2 && !form.business)
                    }
                  >
                    Далее →
                  </button>
                ) : (
                  <button type="submit" className="am-btn-submit">
                    Отправить заявку 🚀
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          /* Success */
          <div className="am-success">
            <div className="am-success__icon">✓</div>
            <h2 className="am-success__title">Заявка отправлена!</h2>
            <p className="am-success__text">
              Спасибо, <strong>{form.name}</strong>! Мы свяжемся с вами
              по номеру <strong>{form.phone}</strong> в течение часа.
            </p>
            <a
              href="https://wa.me/996503030018?text=Привет! Только что оставил заявку на сайте."
              target="_blank"
              rel="noreferrer"
              className="am-success__wa"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.17 1.558 5.943L.057 23.571a.75.75 0 0 0 .915.937l5.85-1.53A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.705 9.705 0 0 1-4.95-1.355l-.355-.21-3.676.963.98-3.572-.23-.368A9.715 9.715 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              Написать в WhatsApp
            </a>
            <button className="am-success__close" onClick={onClose}>Закрыть</button>
          </div>
        )}
      </div>
    </div>
  );
}