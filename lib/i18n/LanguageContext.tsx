'use client';
import React, { createContext, useContext, useState } from 'react';
import { Language } from './dictionaries';

const LanguageContext = createContext<{ lang: Language; setLang: (l: Language) => void }>({ lang: 'en', setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof document === 'undefined') return 'en';
    const locale = document.cookie.split('; ').find(row => row.startsWith('NEXT_LOCALE='))?.split('=')[1] as Language;
    return locale === 'es' ? 'es' : 'en';
  });

  const setLang = (newLang: Language) => {
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
    setLangState(newLang);
    window.location.reload();
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
