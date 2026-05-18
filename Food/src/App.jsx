import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import ServicesPage from "./pages/Services/ServicesPage";
import ReviewsPage from "./pages/Reviews/ReviewsPage";
import ContactsPage from "./pages/Contacts/ContactsPage";
import Cabinet from "./pages/Cabinet/Cabinet";
import ModalPage from "./pages/modal/ModalPage";
import NotFound from "./pages/NotFound/NotFound";
import ChatBot from "./pages/Chat/ChatBot";
import Footer from "./components/Footer/Footer";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  if (!isLoggedIn) {
    return <AuthScreen authMode={authMode} setAuthMode={setAuthMode} onSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/modal" element={<ModalPage />} />
          <Route path="/cabinet" element={<Cabinet />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

function AuthScreen({ authMode, setAuthMode, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");

    if (!email.trim()) {
      setError("Введите email.");
      return;
    }
    if (!password) {
      setError("Введите пароль.");
      return;
    }

    if (authMode === "register") {
      if (!name.trim()) {
        setError("Введите имя.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Пароли не совпадают.");
        return;
      }
    }

    onSuccess();
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="logo-smm">SMM</span>
          <span className="logo-kadr">_KADR</span>
        </div>
        <p className="auth-sub">
          {authMode === "login" ? "Sign in to continue" : "Create your account"}
        </p>
        <div className="auth-tabs">
          <button className={`auth-tab ${authMode === "login" ? "active" : ""}`} onClick={() => setAuthMode("login")}>Login</button>
          <button className={`auth-tab ${authMode === "register" ? "active" : ""}`} onClick={() => setAuthMode("register")}>Register</button>
        </div>
        <div className="auth-form">
          {authMode === "register" && (
            <input
              className="auth-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          )}
          <input
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {authMode === "register" && (
            <input
              className="auth-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          )}
          {error && <p className="auth-error">{error}</p>}
          <button type="button" className="auth-btn" onClick={handleSubmit}>
            {authMode === "login" ? "Sign In" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}