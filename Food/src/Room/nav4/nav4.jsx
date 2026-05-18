import React from "react";
import "./../styles/Nav4.css";

const Nav4 = () => {
  return (
    <div className="nav4-container">
      <h2>Отчёт</h2>
      <div className="nav4-report">
        <p>Оборот: 353 500 сом</p>
        <p>ЗП (общая): 238 010 сом</p>
        <p>Выплачено: 38 239 сом</p>
        <p>Долг по ЗП: 199 771 сом</p>
        <p>Чистая прибыль: 115 490 сом</p>
      </div>
    </div>
  );
};

export default Nav4;