import React from "react";
import { Link } from "react-router-dom";
import "./Terms.css";

export default function Terms() {
  const updated = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="terms" role="main">
      <section className="terms__hero container" aria-labelledby="terms-heading">
        <div className="terms__hero-inner">
          <h1 id="terms-heading" className="terms__title">Условия использования</h1>
          <p className="terms__subtitle">Пожалуйста, внимательно ознакомьтесь с условиями использования наших сервисов.</p>
        </div>
      </section>

      <section className="terms__content container">
        <div className="terms__grid">
          <article className="terms__card">
            <h2 className="terms__card-title">Общие положения</h2>
            <p>Используя сервисы SMM_KADR, вы соглашаетесь с настоящими условиями. Мы оставляем за собой право вносить изменения с уведомлением.</p>
          </article>

          <article className="terms__card">
            <h2 className="terms__card-title">Доступ и использование</h2>
            <p>Доступ к некоторым разделам может требовать регистрации. Пользователь обязуется предоставлять корректную информацию и соблюдать правила.</p>
          </article>

          <article className="terms__card">
            <h2 className="terms__card-title">Ограничения ответственности</h2>
            <p>Мы не несем ответственности за косвенный ущерб, потерю данных или убытки, возникшие вследствие использования материалов сайта.</p>
          </article>

          <article className="terms__card">
            <h2 className="terms__card-title">Интеллектуальная собственность</h2>
            <p>Весь контент сайта защищён авторским правом и иными правами интеллектуальной собственности. Копирование без разрешения запрещено.</p>
          </article>

          <article className="terms__card">
            <h2 className="terms__card-title">Изменения условий</h2>
            <p>Мы можем обновлять условия. Активная версия размещена на этой странице и содержит дату последнего обновления.</p>
          </article>

          <article className="terms__card">
            <h2 className="terms__card-title">Контакты</h2>
            <p>По вопросам условий и юридическим запросам пишите: <a href="mailto:legal@smmkadr.kg">legal@smmkadr.kg</a></p>
          </article>
        </div>
      </section>

      <section className="terms__footer container">
        <div className="terms__bottom">
          <p className="terms__updated">Обновлено: {updated}</p>
          <Link to="/" className="terms__back">Вернуться на главную</Link>
        </div>
      </section>
    </main>
  );
}
