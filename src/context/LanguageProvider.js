import i18next from "i18next";
import { createContext, useEffect, useState } from "react";

export const LanguageContext = createContext();
function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") ?? "vi"
  );
  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
