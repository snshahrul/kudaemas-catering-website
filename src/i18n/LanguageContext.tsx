"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import { en } from "./en";
import { ms } from "./ms";

type Language = "en" | "ms";
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translations: Record<Language, Translations> = {
  en,
  ms,
};

const STORAGE_KEY = "app-language";
const LANGUAGES: Language[] = ["en", "ms"];

/* ------------------------------------------------------------------ */
/*  localStorage as an external store (useSyncExternalStore).          */
/*  SSR snapshot is "en"; the client snapshot reads localStorage, so   */
/*  the saved language is picked up without an effect+setState.        */
/*  Also reacts to `storage` events, i.e. language switches made in    */
/*  another tab stay in sync.                                          */
/* ------------------------------------------------------------------ */

let cachedSnapshot: Language = "en";

function readStoredLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    return saved && LANGUAGES.includes(saved) ? saved : "en";
  } catch {
    return "en";
  }
}

function subscribe(onStoreChange: () => void) {
  // "storage" fires only for changes made in OTHER tabs; same-tab writes
  // notify via the custom event dispatched in persistLanguage below.
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("app-language-changed", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("app-language-changed", onStoreChange);
  };
}

function getSnapshot(): Language {
  const current = readStoredLanguage();
  // Return a stable reference for identical reads to avoid re-render loops.
  if (current !== cachedSnapshot) cachedSnapshot = current;
  return cachedSnapshot;
}

function getServerSnapshot(): Language {
  return "en";
}

function persistLanguage(lang: Language) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Private mode / storage disabled: keep the in-memory choice only.
  }
  // storage events only fire cross-tab, so notify this tab's listeners too.
  window.dispatchEvent(new Event("app-language-changed"));
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    persistLanguage(lang);
  }, []);

  const t = useCallback(
    (path: string): any => {
      const keys = path.split(".");
      let current: any = translations[language];

      for (const key of keys) {
        if (current && current[key]) {
          current = current[key];
        } else {
          return path; // Return the path if key not found
        }
      }
      return current;
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
