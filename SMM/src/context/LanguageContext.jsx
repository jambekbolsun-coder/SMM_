import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import translations, { languages } from "../i18n/translations.js";

const LANGUAGE_STORAGE_KEY = "smmkadr_language";
const DEFAULT_LANGUAGE = "ru";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LANGUAGE;
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved && languages.includes(saved) ? saved : DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const t = useCallback(
    (key, vars = {}) => {
      const current = translations[language] || translations[DEFAULT_LANGUAGE];
      let value = current[key] ?? translations[DEFAULT_LANGUAGE][key] ?? key;

      if (typeof value !== "string") {
        return value;
      }

      return Object.entries(vars).reduce(
        (result, [varName, varValue]) =>
          result.replace(new RegExp(`\\{${varName}\\}`, "g"), varValue),
        value,
      );
    },
    [language],
  );

  const contextValue = useMemo(
    () => ({ language, setLanguage, t, languages }),
    [language, t],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
