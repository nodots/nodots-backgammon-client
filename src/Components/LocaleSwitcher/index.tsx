import { Select, MenuItem, Menu } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NodotsLocale, NodotsLocaleCode, NodotsLocales } from '../../i18n'
import React from 'react'

interface Props {
  handlePostLocaleChange?: (locale: NodotsLocaleCode) => void
}

const LocaleSwitcher = ({ handlePostLocaleChange }: Props) => {
  const { t, i18n } = useTranslation()
  const [locale, setLocale] = React.useState<NodotsLocale>({
    code: i18n.language as NodotsLocaleCode,
    name: '',
  })

  const handleChange = (
    event: React.ChangeEvent<{ value: NodotsLocaleCode }>
  ) => {
    const newLocale = event.target.value as NodotsLocaleCode
    setLocale(NodotsLocales.find((l) => l.code === newLocale) as NodotsLocale)
    i18n.changeLanguage(newLocale)
    if (handlePostLocaleChange) {
      handlePostLocaleChange(newLocale)
    }
  }

  return (
    <Select
      sx={{ minWidth: '240px' }}
      value={i18n.language}
      onChange={(e) =>
        handleChange(e as React.ChangeEvent<{ value: NodotsLocaleCode }>)
      }
    >
      <MenuItem value="">{t('NDBG_DEFAULT_MENU_ITEM')}</MenuItem>
      <MenuItem value="en">{t('NDBG_ENGLISH')}</MenuItem>
      <MenuItem value="es">{t('NDBG_SPANISH')}</MenuItem>
      <MenuItem value="fr">{t('NDBG_FRENCH')}</MenuItem>
      <MenuItem value="ar">{t('NDBG_ARABIC')}</MenuItem>
      <MenuItem value="tr">{t('NDBG_TURKISH')}</MenuItem>
    </Select>
  )
}

export default LocaleSwitcher
