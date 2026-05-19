import React from "react";
import { Link } from "react-router-dom";
import "./Privacy.css";

export default function Privacy() {
  const updated = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="privacy" role="main">
      <section className="privacy__hero" aria-labelledby="privacy-heading">
        <div className="privacy__hero-inner container">
          <header className="privacy__hero-header animate-up">
            <h1 id="privacy-heading" className="privacy__title">
              Политика конфиденциальности
            </h1>
            <p className="privacy__subtitle">
              Мы заботимся о безопасности и конфиденциальности ваших данных.
            </p>
          </header>

          <div className="privacy__hero-card animate-up" aria-hidden="true">
            <p>
              SMM_KADR собирает данные только в объёме, необходимом для
              предоставления услуг и улучшения качества сервиса. Мы применяем
              современные меры защиты и открыты в том, как используем вашу
              информацию.
            </p>
          </div>
        </div>
      </section>

      <section className="privacy__content container" aria-labelledby="privacy-sections">
        <div className="privacy__grid">
          <article className="privacy__card animate-up" id="collect">
            <h2 className="privacy__card-title">Какие данные мы собираем</h2>
            <p>
              Мы можем собирать следующие типы данных: контактная информация
              (имя, email, телефон), данные аккаунта в социальных сетях,
              информацию о взаимодействиях с сайтом и технические данные
              (IP-адрес, сведения о браузере).
            </p>
            <ul className="privacy__list">
              <li>Контактные данные (имя, email, телефон)</li>
              <li>Данные аккаунтов и страниц в соцсетях (при управлении ими)</li>
              <li>Аналитические данные и поведение на сайте</li>
              <li>Технические метаданные и логи</li>
            </ul>
          </article>

          <article className="privacy__card animate-up" id="use">
            <h2 className="privacy__card-title">Как используются данные</h2>
            <p>
              Данные используются для предоставления услуг, коммуникации с
              клиентами, аналитики и улучшения продуктов. Мы используем
              информацию также для персонализации рекомендаций и рекламных
              кампаний по согласованию с клиентом.
            </p>
          </article>

          <article className="privacy__card animate-up" id="protection">
            <h2 className="privacy__card-title">Защита информации</h2>
            <p>
              Мы применяем технические и организационные меры защиты: шифрование
              при передаче данных, строгие права доступа, регулярные аудиты
              безопасности и резервное копирование.
            </p>
          </article>

          <article className="privacy__card animate-up" id="cookies">
            <h2 className="privacy__card-title">Cookies</h2>
            <p>
              На сайте используются cookies и аналогичные технологии для
              корректной работы сервиса, сохранения предпочтений и
              аналитики. Вы можете управлять cookies в настройках браузера.
            </p>
          </article>

          <article className="privacy__card animate-up" id="third">
            <h2 className="privacy__card-title">Передача третьим лицам</h2>
            <p>
              Мы можем передавать данные подрядчикам и сервисам, которые
              помогают нам работать (хостинг, аналитика, платёжные провайдеры).
              Передача осуществляется в рамках договоров с обязанностями по
              защите данных.
            </p>
          </article>

          <article className="privacy__card animate-up" id="contacts">
            <h2 className="privacy__card-title">Контакты</h2>
            <p>
              Вопросы по обработке данных и запросы по вашим персональным
              данным направляйте на почту: <a href="mailto:privacy@smmkadr.kg">privacy@smmkadr.kg</a>
            </p>
          </article>
        </div>
      </section>

      <section className="privacy__footer container">
        <div className="privacy__bottom animate-up">
          <p className="privacy__updated">Обновлено: {updated}</p>
          <Link to="/" className="privacy__back" aria-label="Вернуться на главную">
            Вернуться на главную
          </Link>
        </div>
      </section>
    </main>
  );
}
