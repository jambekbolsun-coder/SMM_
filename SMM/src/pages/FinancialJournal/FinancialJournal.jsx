import { useState, useEffect } from 'react'
import TeamFinance from '../TeamFinance/TeamFinance.jsx'
import './FinancialJournal.css'

let nextId = 100
function uid() { return nextId++ }

function fmt(n) { return Number(n).toLocaleString('ru-RU') }

const INIT_PROJECTS = [
  {
    id: 1, name: 'психолог (одноразовый)', client: 'екатерина',
    dateStart: '2026-05-08', dateEnd: '2026-05-09', price: 12000, done: true,
    employees: [
      { id: 1, name: 'Бегимай', salary: 1500, paid: 0 },
      { id: 2, name: 'Надыр', salary: 6000, paid: 0 },
      { id: 3, name: 'Тариэль Жамалдинов', salary: 2000, paid: 0 },
    ],
  },
  {
    id: 2, name: 'мебельстан', client: 'нурсултан',
    dateStart: '2026-04-28', dateEnd: '2026-05-28', price: 50000, done: true,
    employees: [
      { id: 4, name: 'Тариэль Жамалдинов', salary: 800, paid: 0 },
      { id: 5, name: 'Арсен Абдырахманов', salary: 9698, paid: 0 },
      { id: 6, name: 'Сайкал', salary: 15000, paid: 0 },
      { id: 7, name: 'Бегимай', salary: 3000, paid: 0 },
      { id: 8, name: 'Эржан', salary: 5000, paid: 0 },
    ],
  },
]

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

/* ─── STAT CARD ─── */
function StatCard({ label, value, color }) {
  return (
    <div className={`fj-stat fj-stat--${color}`}>
      <span className="fj-stat__label">{label}</span>
      <span className="fj-stat__value">{fmt(value)}</span>
      <span className="fj-stat__cur">сом</span>
    </div>
  )
}

/* ─── PROJECT CARD ─── */
function ProjectCard({ project, onDelete, onReturn, onPay, onEdit }) {
  const totalSalary = project.employees.reduce((s, e) => s + e.salary, 0)
  const profit = project.price - totalSalary

  return (
    <div className="fj-project">
      <div className="fj-project__top">
        <div className="fj-project__left">
          <div className={`fj-badge ${project.done ? 'fj-badge--done' : 'fj-badge--active'}`}>
            {project.done ? '✓ Выполнен' : '◉ В работе'}
          </div>
          <div className="fj-project__name">{project.name}</div>
          <div className="fj-project__meta">
            <span>👤 {project.client}</span>
            <span>📅 {project.dateStart} — {project.dateEnd}</span>
          </div>
        </div>
        <div className="fj-project__right">
          <div className="fj-project__price">{fmt(project.price)} сом</div>
          <div className="fj-project__actions">
            {project.done && (
              <button className="fj-btn fj-btn--return" onClick={() => onReturn(project.id)}>
                Вернуть в работу
              </button>
            )}
            <button className="fj-btn fj-btn--edit" onClick={() => onEdit(project)}>Ред.</button>
            <button className="fj-btn fj-btn--del" onClick={() => onDelete(project.id)}>✕ Удалить</button>
          </div>
        </div>
      </div>

      <div className="fj-emps">
        {project.employees.map(emp => {
          const debt = emp.salary - emp.paid
          return (
            <div key={emp.id} className="fj-emp">
              <div className="fj-emp__row">
                <span className="fj-emp__name">{emp.name}</span>
                <span className="fj-emp__salary">{fmt(emp.salary)} сом</span>
              </div>
              <span className="fj-emp__paid">Оплачено: {fmt(emp.paid)} сом</span>
              <span className={`fj-emp__debt ${debt === 0 ? 'fj-emp__debt--clear' : ''}`}>
                Остаток: {fmt(debt)} сом
              </span>
              {debt > 0 && (
                <button className="fj-btn fj-btn--pay" onClick={() => onPay(project.id, emp.id)}>
                  Внести
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div className="fj-profit">
        <span>Прибыль компании:</span>
        <span className="fj-profit__val">{fmt(profit)} сом</span>
      </div>
    </div>
  )
}

/* ─── HISTORY MODAL ─── */
function HistoryModal({ deleted, onRestore, onClose }) {
  return (
    <div className="fj-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="fj-modal fj-modal--wide">
        <div className="fj-modal__head">
          <h2>🗂 История удалённых проектов</h2>
          <button className="fj-modal__close" onClick={onClose}>✕</button>
        </div>
        {deleted.length === 0 ? (
          <div className="fj-empty">Удалённых проектов нет</div>
        ) : (
          <div className="fj-history-list">
            {deleted.map(p => (
              <div key={p.id} className="fj-history-row">
                <div className="fj-history-row__info">
                  <span className="fj-history-row__name">{p.name}</span>
                  <span className="fj-history-row__meta">
                    👤 {p.client} &nbsp;•&nbsp; 📅 {p.dateStart} — {p.dateEnd} &nbsp;•&nbsp; {fmt(p.price)} сом
                  </span>
                  <span className="fj-history-row__deleted">
                    Удалён: {p.deletedAt}
                  </span>
                </div>
                <button className="fj-btn fj-btn--restore" onClick={() => onRestore(p.id)}>
                  ↩ Восстановить
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── PROJECT MODAL ─── */
function ProjectModal({ project, onSave, onClose }) {
  const isEdit = !!project?.id
  const [form, setForm] = useState(
    isEdit
      ? { ...project, employees: project.employees.map(e => ({ ...e })) }
      : { name: '', client: '', dateStart: '', dateEnd: '', price: '', done: false, employees: [] }
  )

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setEmp = (idx, k, v) => setForm(f => ({
    ...f,
    employees: f.employees.map((e, i) => i === idx ? { ...e, [k]: v } : e)
  }))
  const addEmp = () => setForm(f => ({
    ...f, employees: [...f.employees, { id: uid(), name: '', salary: '', paid: 0 }]
  }))
  const removeEmp = (idx) => setForm(f => ({
    ...f, employees: f.employees.filter((_, i) => i !== idx)
  }))

  const handleSave = () => {
    if (!form.name.trim() || !form.price) return alert('Заполни название и сумму')
    onSave({
      ...form,
      id: form.id || uid(),
      price: Number(form.price),
      employees: form.employees.map(e => ({ ...e, salary: Number(e.salary) || 0 }))
    })
  }

  return (
    <div className="fj-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="fj-modal">
        <div className="fj-modal__head">
          <h2>{isEdit ? 'Редактировать проект' : 'Новый проект'}</h2>
          <button className="fj-modal__close" onClick={onClose}>✕</button>
        </div>

        <div className="fj-field">
          <label>Название проекта</label>
          <input value={form.name} onChange={e => setField('name', e.target.value)} placeholder="напр. мебельстан" />
        </div>
        <div className="fj-field">
          <label>Клиент</label>
          <input value={form.client} onChange={e => setField('client', e.target.value)} placeholder="имя клиента" />
        </div>
        <div className="fj-modal__grid2">
          <div className="fj-field">
            <label>Дата начала</label>
            <input type="date" value={form.dateStart} onChange={e => setField('dateStart', e.target.value)} />
          </div>
          <div className="fj-field">
            <label>Дата окончания</label>
            <input type="date" value={form.dateEnd} onChange={e => setField('dateEnd', e.target.value)} />
          </div>
        </div>
        <div className="fj-modal__grid2">
          <div className="fj-field">
            <label>Сумма проекта (сом)</label>
            <input type="number" value={form.price} onChange={e => setField('price', e.target.value)} placeholder="0" />
          </div>
          <div className="fj-field">
            <label>Статус</label>
            <select value={String(form.done)} onChange={e => setField('done', e.target.value === 'true')}>
              <option value="false">В работе</option>
              <option value="true">Выполнен</option>
            </select>
          </div>
        </div>

        <div className="fj-emp-section">
          <span className="fj-emp-section__label">Сотрудники</span>
          {form.employees.map((emp, idx) => (
            <div key={emp.id} className="fj-emp-form-row">
              <input value={emp.name} onChange={e => setEmp(idx, 'name', e.target.value)} placeholder="Имя" />
              <input type="number" value={emp.salary} onChange={e => setEmp(idx, 'salary', e.target.value)} placeholder="Зарплата" />
              <button className="fj-emp-remove" onClick={() => removeEmp(idx)}>✕</button>
            </div>
          ))}
          <button className="fj-btn fj-btn--return" onClick={addEmp}>+ Добавить сотрудника</button>
        </div>

        <div className="fj-modal__actions">
          <button className="fj-btn fj-btn--cancel" onClick={onClose}>Отмена</button>
          <button className="fj-btn fj-btn--primary" onClick={handleSave}>Сохранить</button>
        </div>
      </div>
    </div>
  )
}

/* ─── PAY MODAL ─── */
function PayModal({ projectId, empId, empName, maxAmount, onSave, onClose }) {
  const [amount, setAmount] = useState('')
  const handle = () => {
    const n = Number(amount)
    if (!n || n <= 0 || n > maxAmount) return alert(`Введи сумму от 1 до ${fmt(maxAmount)}`)
    onSave(projectId, empId, n)
  }
  return (
    <div className="fj-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="fj-modal fj-modal--sm">
        <div className="fj-modal__head">
          <h2>Внести оплату</h2>
          <button className="fj-modal__close" onClick={onClose}>✕</button>
        </div>
        <div className="fj-field">
          <label>{empName} — остаток {fmt(maxAmount)} сом</label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder={`макс. ${fmt(maxAmount)}`}
            autoFocus
            onKeyDown={e => e.key === 'Enter' && handle()}
          />
        </div>
        <div className="fj-modal__actions">
          <button className="fj-btn fj-btn--cancel" onClick={onClose}>Отмена</button>
          <button className="fj-btn fj-btn--primary" onClick={handle}>Внести</button>
        </div>
      </div>
    </div>
  )
}

/* ─── MAIN ─── */
export default function FinancialJournal() {
  const [tab, setTab] = useState('projects')
  const [projects, setProjects] = useState(() => loadFromStorage('fj_projects', INIT_PROJECTS))
  const [deleted, setDeleted] = useState(() => loadFromStorage('fj_deleted', []))
  const [projectModal, setProjectModal] = useState(null)
  const [payModal, setPayModal] = useState(null)
  const [showHistory, setShowHistory] = useState(false)

  // Сохраняем в localStorage при каждом изменении
  useEffect(() => { localStorage.setItem('fj_projects', JSON.stringify(projects)) }, [projects])
  useEffect(() => { localStorage.setItem('fj_deleted', JSON.stringify(deleted)) }, [deleted])

  const turnover    = projects.reduce((s, p) => s + p.price, 0)
  const totalSalary = projects.reduce((s, p) => s + p.employees.reduce((ss, e) => ss + e.salary, 0), 0)
  const totalPaid   = projects.reduce((s, p) => s + p.employees.reduce((ss, e) => ss + e.paid, 0), 0)
  const totalDebt   = totalSalary - totalPaid
  const netProfit   = turnover - totalSalary

  const handleDelete = (id) => {
    const proj = projects.find(p => p.id === id)
    if (!proj) return
    const now = new Date().toLocaleString('ru-RU')
    setDeleted(d => [{ ...proj, deletedAt: now }, ...d])
    setProjects(ps => ps.filter(p => p.id !== id))
  }

  const handleReturn = (id) => {
    setProjects(ps => ps.map(p => p.id === id ? { ...p, done: false } : p))
  }

  const handleRestore = (id) => {
    const proj = deleted.find(p => p.id === id)
    if (!proj) return
    const { deletedAt, ...clean } = proj
    setProjects(ps => [clean, ...ps])
    setDeleted(d => d.filter(p => p.id !== id))
  }

  const handleSaveProject = (data) => {
    setProjects(ps =>
      ps.find(p => p.id === data.id)
        ? ps.map(p => p.id === data.id ? data : p)
        : [data, ...ps]
    )
    setProjectModal(null)
    setTab('projects')
  }

  const handlePay = (projectId, empId) => {
    const proj = projects.find(p => p.id === projectId)
    const emp  = proj.employees.find(e => e.id === empId)
    setPayModal({ projectId, empId, empName: emp.name, maxAmount: emp.salary - emp.paid })
  }

  const handleSavePay = (projectId, empId, amount) => {
    setProjects(ps => ps.map(p => {
      if (p.id !== projectId) return p
      return {
        ...p,
        employees: p.employees.map(e =>
          e.id !== empId ? e : { ...e, paid: Math.min(e.paid + amount, e.salary) }
        )
      }
    }))
    setPayModal(null)
  }

  const TABS = [
    { key: 'projects', label: 'Проекты' },
    {key: 'team',label: 'Команда'},
    { key: 'new',      label: 'Новый проект' },
    { key: 'report',   label: 'Отчёт' },
  ]

  return (
    <div className="fj-root">
      <header className="fj-header">
        <h1 className="fj-header__title">Финансовый журнал SMM KADR</h1>
        <button className="fj-history-btn" onClick={() => setShowHistory(true)}>
          🗂 История
          {deleted.length > 0 && <span className="fj-history-badge">{deleted.length}</span>}
        </button>
      </header>

      <div className="fj-inner">

        <div className="fj-stats">
          <StatCard label="Оборот"         value={turnover}    color="cyan"  />
          <StatCard label="ЗП (Общая)"     value={totalSalary} color="white" />
          <StatCard label="Выплачено"       value={totalPaid}   color="green" />
          <StatCard label="Долг по ЗП"     value={totalDebt}   color="red"   />
          <StatCard label="Чистая прибыль" value={netProfit}   color="green" />
        </div>

        <nav className="fj-tabs">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`fj-tab ${tab === t.key ? 'fj-tab--active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {tab === 'projects' && (
          <div className="fj-projects-list">
            <div className="fj-list-header">
              <span className="fj-list-count">{projects.length} проектов</span>
              <button className="fj-btn fj-btn--primary" onClick={() => setProjectModal({})}>
                + Новый проект
              </button>
            </div>
            {projects.length === 0 ? (
              <div className="fj-empty">Нет проектов. Добавьте первый!</div>
            ) : (
              projects.map(p => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onDelete={handleDelete}
                  onReturn={handleReturn}
                  onPay={handlePay}
                  onEdit={proj => setProjectModal(proj)}
                />
              ))
            )}
          </div>
        )}

        {tab === 'new' && (
<div className="fj-projects-list">

  <div className="fj-list-header">
    <button className="fj-btn fj-btn--primary">
      + Создать проект
    </button>
  </div>

  {/* ───── PROJECT FORM ───── */}

  <div className="pc-card">

    <div className="pc-head">
      <h1>Параметры проекта</h1>
      <p>Создание и сохранение проекта</p>
    </div>

    <div className="pc-grid">

      <input placeholder="Название проекта" />
      <input type="number" placeholder="Бюджет (сом)" />
      <input placeholder="Клиент / Заказчик" />
      <input type="date" />
      <input type="date" />

    </div>

    <textarea
      placeholder="Заметка к проекту"
      rows="4"
    />

    {/* TEAM */}

    <div className="pc-team">

      <h2>Команда проекта</h2>

      <div className="pc-member-add">

        <input placeholder="Имя" />
        <input placeholder="Роль" />
        <input type="number" placeholder="Оплата" />

        <button>
          + Добавить участника
        </button>

      </div>

      <div className="pc-members">

        <div className="pc-member">
          <div>
            <strong>Пример сотрудника</strong>
            <span>Маркетолог</span>
          </div>

          <div className="pc-member-right">
            <b>0 сом</b>
            <button>✕</button>
          </div>
        </div>

      </div>

    </div>

    {/* PROFIT */}

    <div className="pc-profit">
      Прибыль компании: <span>0 сом</span>
    </div>

    <button className="pc-save">
      Сохранить проект
    </button>

  </div>

</div>
        )}

        {tab === 'team' && (
 <div className="fj-stub">
  <TeamFinance />
</div>
        )}

        {tab === 'report' && (
<div className="fj-report">

  <div className="fj-report__head">
    <div className="fj-stub__icon">📊</div>
    <div>
      <h2>Финансовый отчёт</h2>
      <p>Аналитика по проектам и команде</p>
    </div>
  </div>

  <div className="fj-report__grid">

    <div className="fj-report__card">
      <span>Общий оборот</span>
      <b>365 500 сом</b>
    </div>

    <div className="fj-report__card danger">
      <span>Фонд зарплат</span>
      <b>247 510 сом</b>
    </div>

    <div className="fj-report__card success">
      <span>Чистая прибыль</span>
      <b>117 990 сом</b>
    </div>

    <div className="fj-report__card">
      <span>Рентабельность</span>
      <b>32.3%</b>
    </div>

    <div className="fj-report__card">
      <span>Средний доход с проекта</span>
      <b>52 214 сом</b>
    </div>

    <div className="fj-report__card">
      <span>Проектов всего</span>
      <b>7</b>
    </div>

    <div className="fj-report__card">
      <span>Средняя зарплата</span>
      <b>17 679 сом</b>
    </div>

    <div className="fj-report__card warn">
      <span>Финансовый статус</span>
      <b>Стабильный рост</b>
    </div>

  </div>

  <div className="fj-report__footer">
    📈 Прогноз на следующий месяц: +12–18% рост прибыли при текущем темпе
  </div>

</div>
        )}
      </div>

      {showHistory && (
        <HistoryModal
          deleted={deleted}
          onRestore={handleRestore}
          onClose={() => setShowHistory(false)}
        />
      )}

      {projectModal !== null && (
        <ProjectModal
          project={projectModal?.id ? projectModal : null}
          onSave={handleSaveProject}
          onClose={() => setProjectModal(null)}
        />
      )}

      {payModal && (
        <PayModal {...payModal} onSave={handleSavePay} onClose={() => setPayModal(null)} />
      )}
    </div>
  )
}