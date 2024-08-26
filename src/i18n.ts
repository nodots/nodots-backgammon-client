import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

export type NodotsLanguageCode = 'en' | 'es' | 'fr' | 'ar' | 'tr'

export interface NodotsLanguage {
  languageCode: NodotsLanguageCode
  languageName: string
}

export type NodotsLanguageList = NodotsLanguage[]

export const NodotsLanguages: NodotsLanguageList = [
  { languageCode: 'en', languageName: 'English' },
  { languageCode: 'es', languageName: 'Español' },
  { languageCode: 'fr', languageName: 'Français' },
  { languageCode: 'ar', languageName: 'عربى' },
  { languageCode: 'tr', languageName: 'Türkçe' },
]

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'tr',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '../locales/{{lng}}/{{ns}}.json',
    },
  })

export default i18n
