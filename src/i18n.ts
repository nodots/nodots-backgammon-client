import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { NodotsLocaleCode } from '../nodots_modules/backgammon-types'

export interface NodotsLocale {
  code: NodotsLocaleCode
  name: string
}

export type NodotsLocaleList = NodotsLocale[]

export const NodotsLocales: NodotsLocaleList = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'عربى' },
  { code: 'tr', name: 'Türkçe' },
]

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  })

export default i18n
