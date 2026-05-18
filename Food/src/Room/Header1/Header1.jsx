import React from "react";

const Header = ({ data }) => {
  return (
    <div className="header">
      <h1>Финансовый журнал SMM KADR</h1>
      <div className="summary">
        <p>Оборот: {data.turnover} сом</p>
        <p>ЗП (общая): {data.salaryTotal} сом</p>
        <p>Выплачено: {data.paid} сом</p>
        <p>Долг по ЗП: {data.debt} сом</p>
        <p>Чистая прибыль: {data.profit} сом</p>
      </div>
    </div>
  );
};

export default Header;