import React from "react";
import "./../styles/Nav3.css";

const Nav3 = () => {
  return (
    <div className="nav3-container">
      <h2>Новый проект</h2>
      <form className="nav3-form">
        <input type="text" placeholder="Название проекта" />
        <input type="date" placeholder="Дата начала" />
        <input type="date" placeholder="Дата окончания" />
        <input type="number" placeholder="Бюджет (сом)" />
        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default Nav3;