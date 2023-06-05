import { useState, useEffect, useContext, createContext } from 'react'
import { useContent } from '../hooks';
import en from '../../translations/en.json'
import ru from '../../translations/ru.json'

const translations = {
  en,
  ru,
}

const TranslationContext = createContext();

export const useTranslation = () =>
  useContext(TranslationContext)

export function TranslationProvider({ children }) {
  const { content: { languageGroup } } = useContent();
  const [language, setLanguage] = useState('en');

  const t = (phrase) => translations[language][phrase]

  useEffect(() => {
    if (!languageGroup?.language) {
      return
    }

    setLanguage(languageGroup.language in translations ? languageGroup.language : 'en')
  }, [languageGroup])

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  )
}
