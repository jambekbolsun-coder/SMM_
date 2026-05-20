import { useEffect, useRef } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const { t } = useLanguage();
  const counters = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const targets = [70, 98, 1, 20];
    const labels = [
      t("home_stat_projects"),
      t("home_stat_clients"),
      t("home_stat_experience"),
      t("home_stat_team"),
    ];

    counters.current.forEach((el, i) => {
      if (!el) return;
      let start = 0;
      const end = targets[i];
      const duration = 1800;
      const step = (end / duration) * 16;

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        el.textContent = Math.floor(start) + (i === 1 ? "%" : "+");
      }, 16);
    });
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <section className="home" id="home">
      {/* BG BLOBS */}
      <div className="home__blob home__blob--1" />
      <div className="home__blob home__blob--2" />

      <div className="home__container">
        {/* LEFT */}
        <div className="home__content">
          <div className="home__badge">
            <span className="home__badge-dot" />
            {t("home_badge")}
          </div>

          <h1 className="home__title">
            {t("home_title_part1")} {" "}
            <span className="home__title-highlight">{t("home_title_highlight")}</span>
            <br />
            {t("home_title_part2")}
          </h1>

          <p className="home__subtitle">
            {t("home_subtitle")}
          </p>

          <div className="home__actions">
            <button
              className="home__btn home__btn--primary"
              onClick={() => handleNavigate("/services")}
            >
              {t("home_btn_services")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button
              className="home__btn home__btn--secondary"
              onClick={() => handleNavigate("/contacts")}
            >
              {t("home_btn_contact")}
            </button>
          </div>

          {/* STATS */}
          <div className="home__stats">
            {[t("home_stat_projects"), t("home_stat_clients"), t("home_stat_experience"), t("home_stat_team")].map((label, i) => (
              <div className="home__stat" key={label}>
                <span
                  className="home__stat-num"
                  ref={(el) => (counters.current[i] = el)}
                >
                  0
                </span>
                <span className="home__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — VISUAL CARD */}
        <div className="home__visual">
          <div className="home__card">
            <div className="home__card-header">
              <div className="home__card-dots">
                <span /><span /><span />
              </div>
              <span className="home__card-title">SMM_KADR</span>
            </div>

            <div className="home__card-body">
              <div className="home__card-row">
                <span className="home__card-label">Охват</span>
                <span className="home__card-value">+340%</span>
              </div>
              <div className="home__card-bar-wrap">
                <div className="home__card-bar" style={{ "--w": "85%" }} />
              </div>

              <div className="home__card-row" style={{ marginTop: "16px" }}>
                <span className="home__card-label">Вовлечённость</span>
                <span className="home__card-value">+210%</span>
              </div>
              <div className="home__card-bar-wrap">
                <div className="home__card-bar" style={{ "--w": "65%" }} />
              </div>

              <div className="home__card-row" style={{ marginTop: "16px" }}>
                <span className="home__card-label">Продажи</span>
                <span className="home__card-value">+180%</span>
              </div>
              <div className="home__card-bar-wrap">
                <div className="home__card-bar" style={{ "--w": "55%" }} />
              </div>

              <div className="home__card-tag">📈 Средний рост клиентов</div>
            </div>
          </div>

          {/* FLOATING BADGES */}
          <div className="home__float home__float--1">
            {t("home_float_targeting")}
          </div>
          <div className="home__float home__float--2">
            {t("home_float_video")}
          </div>
          <div className="home__float home__float--3">
            {t("home_float_analytics")}
          </div>
        </div>
      </div>

      {/* SCROLL HINT */}
      <div className="home__scroll-hint" onClick={() => handleNavigate("/about")}>
        <div className="home__scroll-mouse">
          <div className="home__scroll-wheel" />
        </div>
        <span>{t("home_scroll_hint")}</span>
      </div>
    </section>
  );
}