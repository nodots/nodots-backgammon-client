import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState(i18n.language)

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
    setLanguage(language)
  }

  const handleLanguageChange = (event: SelectChangeEvent<string>) =>
    changeLanguage(event.target.value)

  return (
    <Select value={language} onChange={(e) => handleLanguageChange(e)}>
      <MenuItem value="ar">{t('NDBG_ARABIC')}</MenuItem>
      <MenuItem value="en">{t('NDBG_ENGLISH')}</MenuItem>
      <MenuItem value="fr">{t('NDBG_FRENCH')}</MenuItem>
      <MenuItem value="es">{t('NDBG_SPANISH')}</MenuItem>
      <MenuItem value="tr">{t('NDBG_TURKISH')}</MenuItem>
    </Select>
  )
}

export default LanguageSwitcher
