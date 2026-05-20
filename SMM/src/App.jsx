import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import ServicesPage from "./components/Services/Services.jsx";
import TeamPage from "./pages/Team/Team.jsx";
import ReviewsPage from "./pages/Reviews/ReviewsPage.jsx";
import ContactsPage from "./pages/Contacts/ContactsPage.jsx";
import Cabinet from "./pages/Cabinet/Cabinet.jsx";
import ModalPage from "./pages/modal/ModalPage.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Privacy from "./pages/Privacy/Privacy.jsx";
import Terms from "./pages/Terms/Terms.jsx";
import ChatBot from "./pages/Chat/ChatBot.jsx";
import Footer from "./components/Footer/Footer.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
          <Route path="/team" element={<TeamPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/modal" element={<ModalPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cabinet" element={<Cabinet />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

