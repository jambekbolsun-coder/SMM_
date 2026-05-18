import "./About.css";

const team = [
  { emoji: "📊", role: "Отдел маркетинга", desc: "Разрабатываем стратегию и аналитику для роста вашего бренда" },
  { emoji: "🎬", role: "Мобилограф", desc: "Снимаем качественный вертикальный контент для Reels и TikTok" },
  { emoji: "🎤", role: "Амбассадор", desc: "Представляем ваш бренд с энергией и харизмой" },
  { emoji: "🎯", role: "Таргетолог", desc: "Настраиваем рекламу точно на вашу целевую аудиторию" },
  { emoji: "🗂", role: "Менеджер проекта", desc: "Контролируем сроки и качество каждого этапа" },
  { emoji: "✍️", role: "Контент и сценарии", desc: "Пишем скрипты и тексты, которые цепляют с первых секунд" },
];

const values = [
  { icon: "⚡", title: "Скорость", desc: "Сдаём материалы в срок, без задержек" },
  { icon: "🎨", title: "Креатив", desc: "Каждый проект — уникальный подход" },
  { icon: "📈", title: "Результат", desc: "Работаем на конкретные цифры и KPI" },
  { icon: "🤝", title: "Доверие", desc: "Прозрачность и честность с каждым клиентом" },
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__container">

        {/* SECTION LABEL */}
        <div className="section-label">О нас</div>

        {/* HEADER */}
        <div className="about__header">
          <h2 className="about__title">
            Кто такие <span className="about__title-blue">SMM_KADR?</span>
          </h2>
          <p className="about__subtitle">
            Мы — молодая, но уже опытная команда специалистов из Бишкека.
            Помогаем бизнесу выйти на новый уровень в социальных сетях.
            За каждым проектом стоит полноценная команда, а не один фрилансер.
          </p>
        </div>

        {/* VALUES */}
        <div className="about__values">
          {values.map((v) => (
            <div className="about__value-card" key={v.title}>
              <span className="about__value-icon">{v.icon}</span>
              <h4 className="about__value-title">{v.title}</h4>
              <p className="about__value-desc">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="about__divider" />

        {/* TEAM */}
        <div className="about__team-header">
          <h3 className="about__team-title">Наша команда</h3>
          <p className="about__team-sub">
            Каждый специалист — профессионал в своей области
          </p>
        </div>

        <div className="about__team">
          {team.map((member) => (
            <div className="about__team-card" key={member.role}>
              <div className="about__team-emoji">{member.emoji}</div>
              <h4 className="about__team-role">{member.role}</h4>
              <p className="about__team-desc">{member.desc}</p>
            </div>
          ))}
        </div>

        {/* BOTTOM BANNER */}
        <div className="about__banner">
          <div className="about__banner-content">
            <h3>Готовы работать с вами</h3>
            <p>Оставьте заявку и мы свяжемся с вами в течение часа</p>
          </div>
          <a
            href="#contacts"
            className="about__banner-btn"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Написать нам →
          </a>
        </div>

      </div>
    </section>
  );
}