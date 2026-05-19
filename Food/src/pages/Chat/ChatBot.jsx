import { useEffect, useRef, useState } from "react";
import "./ChatBot.css";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { chatData } from "./chatbotData.js";
import {
  getReplyForIntent,
  createBotMessage,
  createUserMessage,
  getRandomElement,
  getTypingTextOptions,
  extractClientInfo,
} from "./chatbotHelpers.js";

export default function ChatBot() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [clientProfile, setClientProfile] = useState({ name: "", service: "", package: "" });
  const endRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedHistory = window.localStorage.getItem(chatData.storageKey);
    const savedProfile = window.localStorage.getItem(chatData.profileKey);

    if (savedHistory) {
      setMessages(JSON.parse(savedHistory));
    } else {
      setMessages([createBotMessage(t("chatbot_welcome"), { buttons: [] })]);
    }

    if (savedProfile) {
      setClientProfile(JSON.parse(savedProfile));
    }
  }, [t]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (messages.length === 0) return;
    window.localStorage.setItem(chatData.storageKey, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    window.localStorage.setItem(chatData.profileKey, JSON.stringify(clientProfile));
  }, [clientProfile]);

  const handleButtonAction = (action) => {
    if (action.action === "url" && action.url) {
      window.open(action.url, "_blank", "noopener,noreferrer");
      return;
    }

    if (action.action === "route" && action.route) {
      window.location.href = action.route;
      return;
    }
  };

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleQuickAction = (action) => {
    sendMessage(action.query);
  };

  const clearChat = () => {
    setMessages([createBotMessage(t("chatbot_welcome"), { buttons: [] })]);
    setClientProfile({ name: "", service: "", package: "" });
    window.localStorage.removeItem(chatData.storageKey);
    window.localStorage.removeItem(chatData.profileKey);
  };

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const userMessage = createUserMessage(trimmed);
    const updatedProfile = extractClientInfo(trimmed, clientProfile);

    setClientProfile(updatedProfile);
    addMessage(userMessage);
    setInput("");

    const reply = getReplyForIntent(trimmed, t, updatedProfile);
    setTyping(true);
    setTypingText(getRandomElement(getTypingTextOptions(t)));

    const delay = 850 + Math.floor(Math.random() * 750);
    setTimeout(() => {
      setTyping(false);
      addMessage(createBotMessage(reply.text, { buttons: reply.buttons }));
    }, delay);
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        className={`chatbot__fab ${open ? "chatbot__fab--open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={t("chat_placeholder")}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
        )}
        {!open && <span className="chatbot__fab-badge">!</span>}
      </button>

      <div className={`chatbot__window ${open ? "chatbot__window--open" : ""}`}>
        <div className="chatbot__header">
          <div className="chatbot__header-avatar">S</div>
          <div className="chatbot__header-meta">
            <div className="chatbot__header-name">{t("chat_header_name")}</div>
            <div className="chatbot__header-status">
              <span className="chatbot__online-dot" />
              {t("chat_header_status")}
            </div>
          </div>
          <button className="chatbot__clear" onClick={clearChat} title={t("chat_clear_history")}>⟳</button>
          <button className="chatbot__close" onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="chatbot__quick-panel">
          <div className="chatbot__quick-title">{t("chat_quick_title")}</div>
          <div className="chatbot__quick-buttons">
            {chatData.quickActions.map((action) => (
              <button
                key={action.id}
                className="chatbot__quick-btn"
                onClick={() => handleQuickAction(action)}
              >
                {t(action.labelKey)}
              </button>
            ))}
          </div>
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
            placeholder={t("chat_placeholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          />
          <button className="chatbot__send" onClick={() => sendMessage(input)}>
            {t("chat_cta_apply")}
          </button>
        </div>
      </div>
    </>
  );
}