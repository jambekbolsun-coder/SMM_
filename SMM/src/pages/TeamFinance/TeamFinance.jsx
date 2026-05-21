import { useEffect, useMemo, useState } from "react";
import "./TeamFinance.css";

const defaultEmployees = [
  {
    id: 1,
    name: "Рамиль Кадыров",
    role: "Руководитель",
    earned: 1000,
    paid: 0,
    bonus: 0,
    notes: "",
  },
  {
    id: 2,
    name: "Радмир Кокоджанов",
    role: "Босс",
    earned: 23210,
    paid: 0,
    bonus: 0,
    notes: "",
  },
  {
    id: 3,
    name: "Тариэль Жамалдинов",
    role: "Руководитель отдела маркетинга",
    earned: 29960,
    paid: 0,
    bonus: 0,
    notes: "",
  },
];

export default function TeamFinance() {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem("team-finance");
    return saved ? JSON.parse(saved) : defaultEmployees;
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("team-history");
    return saved ? JSON.parse(saved) : [];
  });

  const [showHistory, setShowHistory] = useState(false);

  const [newEmp, setNewEmp] = useState({
    name: "",
    role: "",
    earned: "",
  });

  useEffect(() => {
    localStorage.setItem("team-finance", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem("team-history", JSON.stringify(history));
  }, [history]);

  const totalEarned = useMemo(
    () => employees.reduce((a, b) => a + b.earned + b.bonus, 0),
    [employees]
  );

  const totalPaid = useMemo(
    () => employees.reduce((a, b) => a + b.paid, 0),
    [employees]
  );

  const totalBalance = useMemo(
    () =>
      employees.reduce(
        (a, b) => a + (b.earned + b.bonus - b.paid),
        0
      ),
    [employees]
  );

  const addHistory = (text) => {
    setHistory((prev) => [
      {
        id: Date.now(),
        text,
        date: new Date().toLocaleString(),
      },
      ...prev,
    ]);
  };

  const addEmployee = () => {
    if (!newEmp.name || !newEmp.role) return;

    const emp = {
      id: Date.now(),
      name: newEmp.name,
      role: newEmp.role,
      earned: Number(newEmp.earned) || 0,
      paid: 0,
      bonus: 0,
      notes: "",
    };

    setEmployees((prev) => [...prev, emp]);

    addHistory(`Добавлен сотрудник: ${emp.name}`);

    setNewEmp({
      name: "",
      role: "",
      earned: "",
    });
  };

  const removeEmployee = (id) => {
    const emp = employees.find((e) => e.id === id);

    if (!window.confirm(`Удалить ${emp.name}?`)) return;

    setEmployees((prev) => prev.filter((e) => e.id !== id));

    addHistory(`Удалён сотрудник: ${emp.name}`);
  };

  const makePayment = (id) => {
    const amount = Number(prompt("Сколько выплатить?"));

    if (!amount || amount <= 0) return;

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              paid: emp.paid + amount,
            }
          : emp
      )
    );

    const emp = employees.find((e) => e.id === id);

    addHistory(`Выплата ${amount} сом → ${emp.name}`);
  };

  const addBonus = (id) => {
    const amount = Number(prompt("Введите бонус"));

    if (!amount || amount <= 0) return;

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              bonus: emp.bonus + amount,
            }
          : emp
      )
    );

    const emp = employees.find((e) => e.id === id);

    addHistory(`Бонус ${amount} сом → ${emp.name}`);
  };

  const editInfo = (id) => {
    const current = employees.find((e) => e.id === id);

    const note = prompt("Информация о сотруднике", current.notes || "");

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              notes: note,
            }
          : emp
      )
    );

    addHistory(`Обновлена информация: ${current.name}`);
  };

  return (
    <div className="tf-root">

      <header className="tf-header">
        <div>
          <h1>Сотрудники и баланс</h1>
          <p>Управление командой и выплатами</p>
        </div>

        <button
          className="tf-history-btn"
          onClick={() => setShowHistory(true)}
        >
          История персонала
          <span>{history.length}</span>
        </button>
      </header>

      <section className="tf-stats">

        <div className="tf-stat">
          <label>Общий заработок</label>
          <strong>{totalEarned.toLocaleString()} сом</strong>
        </div>

        <div className="tf-stat">
          <label>Выплачено</label>
          <strong>{totalPaid.toLocaleString()} сом</strong>
        </div>

        <div className="tf-stat tf-stat--green">
          <label>Остаток</label>
          <strong>{totalBalance.toLocaleString()} сом</strong>
        </div>

      </section>

      <section className="tf-add">

        <input
          placeholder="Имя"
          value={newEmp.name}
          onChange={(e) =>
            setNewEmp({ ...newEmp, name: e.target.value })
          }
        />

        <input
          placeholder="Должность"
          value={newEmp.role}
          onChange={(e) =>
            setNewEmp({ ...newEmp, role: e.target.value })
          }
        />

        <input
          placeholder="Заработано"
          type="number"
          value={newEmp.earned}
          onChange={(e) =>
            setNewEmp({ ...newEmp, earned: e.target.value })
          }
        />

        <button onClick={addEmployee}>
          + Добавить
        </button>

      </section>

      <section className="tf-grid">

        {employees.map((emp) => {

          const balance =
            emp.earned + emp.bonus - emp.paid;

          return (
            <div className="tf-card" key={emp.id}>

              <div className="tf-card-top">

                <div>
                  <h3>{emp.name}</h3>
                  <p>{emp.role}</p>
                </div>

                <button
                  className="tf-delete"
                  onClick={() => removeEmployee(emp.id)}
                >
                  ✕
                </button>

              </div>

              <div className="tf-money">

                <div>
                  <span>Заработано</span>
                  <strong>
                    {(emp.earned + emp.bonus).toLocaleString()} сом
                  </strong>
                </div>

                <div>
                  <span>Выплачено</span>
                  <strong>
                    {emp.paid.toLocaleString()} сом
                  </strong>
                </div>

                <div>
                  <span>Остаток</span>
                  <strong className={balance > 0 ? "green" : ""}>
                    {balance.toLocaleString()} сом
                  </strong>
                </div>

              </div>

              {emp.notes && (
                <div className="tf-note">
                  📝 {emp.notes}
                </div>
              )}

              <div className="tf-actions">

                <button
                  className="pay"
                  onClick={() => makePayment(emp.id)}
                >
                  💸 Выплата
                </button>

                <button
                  className="bonus"
                  onClick={() => addBonus(emp.id)}
                >
                  ⚡ Бонус
                </button>

                <button
                  className="info"
                  onClick={() => editInfo(emp.id)}
                >
                  📝 Инфо
                </button>

              </div>

            </div>
          );
        })}
      </section>

      {showHistory && (
        <div
          className="tf-overlay"
          onClick={() => setShowHistory(false)}
        >
          <div
            className="tf-history"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="tf-history-top">
              <h2>История персонала</h2>

              <button onClick={() => setShowHistory(false)}>
                ✕
              </button>
            </div>

            {history.length === 0 ? (
              <div className="tf-empty">
                История пока пустая
              </div>
            ) : (
              <div className="tf-history-list">

                {history.map((item) => (
                  <div className="tf-history-item" key={item.id}>
                    <strong>{item.text}</strong>
                    <span>{item.date}</span>
                  </div>
                ))}

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}