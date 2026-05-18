import { useState, useRef, useEffect } from "react";
import "./ChatBot.css";

const FAQ = [
  { q: "Какие пакеты вы предлагаете?", a: "Мы предлагаем 4 пакета: Standard (65 000 сом/месяц), Advanced (85 000 сом/месяц), Basic разовый (12 500 сом) и Pro разовый (15 000 сом). Каждый пакет включает полную команду специалистов." },
  { q: "Как быстро вы отвечаете?", a: "Мы отвечаем в течение 1 часа в рабочие дни (Пн–Пт, 9:00–18:00). По срочным вопросам свяжитесь с нами через Telegram или WhatsApp." },
  { q: "Что входит в ежемесячные пакеты?", a: "Ежемесячные пакеты включают маркетинговую команду, мобилографа, амбассадора, таргетолога, проектного менеджера и создание контента/сценариев. В Advanced также входят сторисмейкер и графический дизайнер." },
  { q: "Как начать сотрудничество?", a: "Просто заполните контактную форму или напишите нам в Telegram/WhatsApp. Мы обсудим ваши цели и подберем подходящий пакет для вашего бизнеса." },
  { q: "Вы работаете с маленькими бизнесами?", a: "Конечно! Мы работаем с бизнесами любого размера — от небольших локальных магазинов до крупных брендов. Наши разовые пакеты отлично подходят для старта." },
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Привет! 👋 Я помощник SMM_KADR. Чем могу помочь?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text) => {
    if (!text.trim()) return;
    const userMsg = { from: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const match = FAQ.find((f) =>
        text.toLowerCase().includes(f.q.toLowerCase().split(" ")[0]) ||
        f.q.toLowerCase().includes(text.toLowerCase().split(" ")[0])
      );
      const reply = match
        ? match.a
        : "Отличный вопрос! Для подробной информации свяжитесь с нами через форму ниже или в Telegram. Мы ответим вам в течение 1 часа. 🚀";

      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: reply }]);
    }, 1200);
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        className={`chatbot__fab ${open ? "chatbot__fab--open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Чат"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        )}
        {!open && <span className="chatbot__fab-badge">1</span>}
      </button>

      {/* CHAT WINDOW */}
      <div className={`chatbot__window ${open ? "chatbot__window--open" : ""}`}>
        {/* HEADER */}
        <div className="chatbot__header">
          <div className="chatbot__header-avatar">S</div>
          <div>
            <div className="chatbot__header-name">Поддержка SMM_KADR</div>
            <div className="chatbot__header-status">
              <span className="chatbot__online-dot" />
              Онлайн
            </div>
          </div>
          <button className="chatbot__close" onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* QUICK REPLIES */}
        <div className="chatbot__quick">
          {FAQ.slice(0, 3).map((f) => (
            <button
              key={f.q}
              className="chatbot__quick-btn"
              onClick={() => send(f.q)}
            >
              {f.q}
            </button>
          ))}
        </div>

        {/* MESSAGES */}
        <div className="chatbot__messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot__msg chatbot__msg--${msg.from}`}>
              {msg.from === "bot" && (
                <div className="chatbot__msg-avatar">S</div>
              )}
              <div className="chatbot__msg-bubble">{msg.text}</div>
            </div>
          ))}
          {typing && (
            <div className="chatbot__msg chatbot__msg--bot">
              <div className="chatbot__msg-avatar">S</div>
              <div className="chatbot__typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* INPUT */}
        <div className="chatbot__input-row">
          <input
            className="chatbot__input"
            placeholder="Введите сообщение..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
          />
          <button
            className="chatbot__send"
            onClick={() => send(input)}
          >
            →
          </button>
        </div>
      </div>
    </>
  );
}