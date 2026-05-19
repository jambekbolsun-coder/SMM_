import { useState } from "react";
import "./Contacts.css";

export default function Contacts() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!form.name || !form.phone) return;
    setSent(true);
  };

  return (
    <section className="contacts" id="contacts">
      <div className="contacts__container">
        <div className="section-label">Свяжитесь с нами</div>

        <div className="contacts__header">
          <h2 className="contacts__title">
            Давайте <span className="blue">работать вместе</span>
          </h2>
          <p className="contacts__sub">
            Оставьте свои данные, и мы свяжемся с вами в течение 1 часа.
          </p>
        </div>

        <div className="contacts__grid">
          {/* LEFT — INFO */}
          <div className="contacts__info">
            <div className="contacts__info-cards">
              {[
                { icon: "📍", label: "Локация", value: "Бишкек, Кыргызстан" },
                { icon: "📞", label: "Телефон", value: "+996 503 030 018" },
                { icon: "✉️", label: "Email", value: "info@smmkadr.kg" },
                { icon: "🕐", label: "Рабочие часы", value: "Пн–Сб: 9:00–18:00" },
              ].map((item) => (
                <div className="contacts__info-card" key={item.label}>
                  <div className="contacts__info-icon">{item.icon}</div>
                  <div>
                    <div className="contacts__info-label">{item.label}</div>
                    <div className="contacts__info-value">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* SOCIALS */}
            <div className="contacts__socials">
              <a href="https://www.instagram.com/smm_kadr?igsh=MWZvcjRocHN0M255Mg==" className="contacts__social-btn contacts__social-btn--ig">
                Instagram
              </a>
              <a href="https://t.me/RG1010101" className="contacts__social-btn contacts__social-btn--tg">
                Telegram
              </a>
              <a href="https://wa.me/996503030018" className="contacts__social-btn contacts__social-btn--wa">
                WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="contacts__form-wrap">
            {sent ? (
              <div className="contacts__success">
                <div className="contacts__success-icon">🚀</div>
                <h3>Сообщение отправлено!</h3>
                <p>Мы свяжемся с вами в течение 1 часа.</p>
                <button onClick={() => { setSent(false); setForm({ name: "", phone: "", message: "" }); }}>
                  Отправить ещё
                </button>
              </div>
            ) : (
              <div className="contacts__form">
                <h3 className="contacts__form-title">Отправить заявку</h3>

                <div className="contacts__field">
                  <label>Ваше имя *</label>
                  <input
                    placeholder="Жамшутов Бекболсун"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="contacts__field">
                  <label>Номер телефона *</label>
                  <input
                    placeholder="+996 700 000 000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                <div className="contacts__field">
                  <label>Сообщение (необязательно)</label>
                  <textarea
                    placeholder="Расскажите о вашем проекте..."
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button
                  className={`contacts__send-btn ${(!form.name || !form.phone) ? "disabled" : ""}`}
                  onClick={handleSend}
                >
                  Отправить заявку →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}