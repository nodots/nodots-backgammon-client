import { MenuItem, Select } from '@mui/material'
import { NodotsLocale, NodotsLocales, NodotsLocaleCode } from '../../i18n'
import { useTranslation } from 'react-i18next'

interface Props {
  onLocaleChange?: (locale: NodotsLocaleCode) => void
}

const getMenuItems = () => {
  return NodotsLocales.map((locale) => (
    <MenuItem key={`language-menu-${locale.code}`}>{locale.name}</MenuItem>
  ))
}

const LocaleMenu = ({ onLocaleChange }: Props) => {
  const { t, i18n } = useTranslation()

  const handleLocaleChange = (locale: NodotsLocaleCode) => {
    i18n.changeLanguage(locale)
  }

  return (
    <Select
      id="NodotsLanguageSwitcher"
      value=""
      onChange={(e) => handleLocaleChange(e.target.value as NodotsLocaleCode)}
    >
      <MenuItem key="language-menu-default" value="">
        {t('NDBG_DEFAULT_MENU_ITEM')}
      </MenuItem>
      {getMenuItems()}
    </Select>
  )
}

export default LocaleMenu
