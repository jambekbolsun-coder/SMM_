import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./About.css";

const team = [
  { emoji: "📊", role: "about_card_marketing", desc: "about_card_marketing_desc" },
  { emoji: "🎬", role: "about_card_mobilographer", desc: "about_card_mobilographer_desc" },
  { emoji: "🎤", role: "about_card_ambassador", desc: "about_card_ambassador_desc" },
  { emoji: "🎯", role: "about_card_targeting", desc: "about_card_targeting_desc" },
  { emoji: "🗂", role: "about_card_manager", desc: "about_card_manager_desc" },
  { emoji: "✍️", role: "about_card_content", desc: "about_card_content_desc" },
];

const values = [
  { icon: "⚡", title: "about_value_1_title", desc: "about_value_1_desc" },
  { icon: "🎨", title: "about_value_2_title", desc: "about_value_2_desc" },
  { icon: "📈", title: "about_value_3_title", desc: "about_value_3_desc" },
  { icon: "🤝", title: "about_value_4_title", desc: "about_value_4_desc" },
];

export default function About() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="about" id="about">
      <div className="about__container">

        {/* SECTION LABEL */}
        <div className="section-label">{t("about_section_label")}</div>

        {/* HEADER */}
        <div className="about__header">
          <h2 className="about__title">
            {t("about_title_part1")} <span className="about__title-blue">{t("about_title_blue")}</span>
          </h2>
          <p className="about__subtitle">
            {t("about_subtitle")}
          </p>
        </div>

        {/* VALUES */}
        <div className="about__values">
          {values.map((v) => (
            <div className="about__value-card" key={v.title}>
              <span className="about__value-icon">{v.icon}</span>
              <h4 className="about__value-title">{t(v.title)}</h4>
              <p className="about__value-desc">{t(v.desc)}</p>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="about__divider" />

        {/* TEAM */}
        <div className="about__team-header">
          <h3 className="about__team-title">{t("about_team_title")}</h3>
          <p className="about__team-sub">{t("about_team_sub")}</p>
        </div>

        <div className="about__team">
          {team.map((member) => (
            <div className="about__team-card" key={member.role}>
              <div className="about__team-emoji">{member.emoji}</div>
              <h4 className="about__team-role">{t(member.role)}</h4>
              <p className="about__team-desc">{t(member.desc)}</p>
            </div>
          ))}
        </div>

        {/* BOTTOM BANNER */}
        <div className="about__banner">
          <div className="about__banner-content">
            <h3>{t("about_banner_title")}</h3>
            <p>{t("about_banner_sub")}</p>
          </div>
          <button
            type="button"
            className="about__banner-btn"
            onClick={() => navigate("/contacts")}
          >
            {t("about_banner_btn")}
          </button>
        </div>

      </div>
    </section>
  );
}