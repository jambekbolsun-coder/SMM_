
import "./Team.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const team = [
  { name: "Айтбек Токтогулович",   role: "Основатель",                          img: "aitbek.png" },
  { name: "Элдар Торокулов",       role: "Сооснователь, Финансовый директор",    img: "eldar.png" },
  { name: "Рамиль Кадыров",        role: "Директор",                             img: "ramil1.jpeg" },
  { name: "Эржан Алкожоев",        role: "Заместитель директора",                img: "erzhan.png" },
  { name: "Бегимай",               role: "РОП",                                  img: "begimay.jpg" },
  { name: "Асема Исмаилбекова",    role: "Менеджер",                             img: "asema.png" },
  { name: "Артур Ибрагимов",       role: "Амбассадор",                           img: "artur.jpeg" },
  { name: "Гюзель",                role: "Амбассадор",                           img: "guzel.jpeg" },
  { name: "Салима",                role: "Амбассадор",                           img: "salima.jpeg" },
  { name: "Эрлан",                 role: "Амбассадор",                           img: "erlan.png" },
  { name: "Ажыманова Даяна",       role: "Амбассадор",                           img: "dayana.jpg" },
  { name: "Джамалдинов Тариель",   role: "Маркетолог",                           img: "tariel.png" },
  { name: "Арсен Абдрахманов",     role: "Маркетолог",                           img: "arsen.jpeg" },
  { name: "Радмир",                role: "Маркетолог",                           img: "radmir.jpeg" },
  { name: "Актан",                 role: "Мобилограф",                           img: "aktan.png" },
  { name: "Сайкал",                role: "Мобилограф",                           img: "saikal.jpeg" },
  { name: "Даткайым",              role: "Мобилограф",                           img: "datkaiym.png" },
  { name: "Бекболот",              role: "Мобилограф",                           img: "bekbolot.jpeg" },
  { name: "Бекболсун",             role: "Главный программист ",     img: "me.png" },
];

const roleColors = {
  "Основатель":               "#2563EB",
  "Сооснователь, Финансовый директор": "#7C3AED",
  "Директор":                 "#2563EB",
  "Заместитель директора":    "#0891B2",
  "РОП":                      "#059669",
  "Менеджер":                 "#059669",
  "Амбассадор":               "#D97706",
  "Маркетолог":               "#DC2626",
  "Мобилограф":               "#7C3AED",
  "Главный программист ": "#7C3AED",
};

const roleGroups = ["Все", "Руководство", "Маркетинг", "Амбассадоры", "Мобилографы", ];

function getRoleGroup(role) {
  if (["Основатель", "Сооснователь, Финансовый директор", "Директор", "Заместитель директора", "РОП"].includes(role)) return "Руководство";
  if (["Маркетолог","Менеджер", "Главный программист "].includes(role)) return "Маркетинг";
  if (role === "Амбассадор") return "Амбассадоры";
  if (role === "Мобилограф") return "Мобилографы";
}

/* Анимированный счётчик */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function TeamPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Все");
  const [hovered, setHovered] = useState(null);

  /* scroll-reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filter]);

  const filtered = filter === "Все"
    ? team
    : team.filter((m) => getRoleGroup(m.role) === filter);

  return (
    <div className="team-page">

      {/* ── FLOATING BLOBS BACKGROUND ── */}
      <div className="team-page__bg" aria-hidden>
        <div className="float-blob float-blob--1" />
        <div className="float-blob float-blob--2" />
        <div className="float-blob float-blob--3" />
      </div>

      {/* ── HERO ── */}
      <section className="tp-hero">
        <div className="tp-hero__inner">
          <div className="tp-hero__badge fade-up">
            <span className="tp-hero__dot" />
            Наша команда
          </div>
          <h1 className="tp-hero__title fade-up">
            Люди, которые делают<br />
            <span className="tp-hero__accent">SMM_KADR живым</span>
          </h1>
          <p className="tp-hero__sub fade-up">
            {team.length} профессионалов, объединённых одной целью —
            создавать контент, который работает на ваш бизнес.
          </p>
        </div>
      </section>

      {/* ── LIVE COUNTERS ── */}
      <section className="tp-stats">
        <div className="tp-stats__inner">
          {[
            { label: "Специалистов в команде", target: team.length, suffix: "" },
            { label: "Проектов выполнено",     target: 103,         suffix: "+" },
            { label: "Клиентов доверяют нам",  target: 90,         suffix: "+" },
            { label: "Лет на рынке",           target: 1,           suffix: "" },
          ].map((s, i) => (
            <div className="tp-stat fade-up" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="tp-stat__num">
                <Counter target={s.target} suffix={s.suffix} />
              </span>
              <span className="tp-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FILTERS ── */}
      <section className="tp-filters fade-up">
        <div className="tp-filters__inner">
          {roleGroups.map((g) => (
            <button
              key={g}
              className={`tp-filter-btn${filter === g ? " tp-filter-btn--active" : ""}`}
              onClick={() => setFilter(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </section>

      {/* ── TEAM GRID ── */}
      <section className="tp-grid-section">
        <div className="tp-grid">
          {filtered.map((member, i) => {
            const color = roleColors[member.role] || "#2563EB";
            return (
              <div
                className="tp-card fade-up"
                key={member.name}
                style={{ animationDelay: `${(i % 6) * 0.07}s` }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* glow on hover */}
                <div
                  className="tp-card__glow"
                  style={{ background: color, opacity: hovered === i ? 0.12 : 0 }}
                />

                {/* Photo */}
                <div className="tp-card__photo-wrap">
                  <img
                    src={new URL(`../../assets/img/${member.img}`, import.meta.url).href}
                    alt={member.name}
                    className="tp-card__photo"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="tp-card__photo-fallback" style={{ display: "none" }}>
                    {member.name.charAt(0)}
                  </div>
                  <div className="tp-card__photo-overlay" />
                </div>

                {/* Info */}
                <div className="tp-card__info">
                  <h3 className="tp-card__name">{member.name}</h3>
                  <span
                    className="tp-card__role"
                    style={{ color }}
                  >
                    {member.role}
                  </span>
                </div>

                {/* Role badge */}
                <div
                  className="tp-card__badge"
                  style={{ background: color + "18", color }}
                >
                  {getRoleGroup(member.role)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── JOIN US ── */}
      <section className="tp-join fade-up">
        <div className="tp-join__inner">
          <div className="tp-join__text">
            <h2 className="tp-join__title">Хочешь стать частью команды?</h2>
            <p className="tp-join__sub">
              Мы всегда в поиске талантливых людей. Если ты мобилограф,
              маркетолог или амбассадор — напиши нам.
            </p>
          </div>
          <button
            className="btn-primary btn-primary--lg"
            onClick={() => navigate("/contacts")}
          >
            Написать нам →
          </button>
        </div>
      </section>
      {/* LIVE POPUPS */}


    </div>
  );
}