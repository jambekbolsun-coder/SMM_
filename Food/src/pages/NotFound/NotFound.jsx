import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="notfound-page">
      <div className="notfound-page__container">
        <h1>Страница не найдена</h1>
        <p>К сожалению, такой страницы не существует.</p>
        <Link className="notfound-page__link" to="/">
          Вернуться на главную
        </Link>
      </div>
    </section>
  );
}
