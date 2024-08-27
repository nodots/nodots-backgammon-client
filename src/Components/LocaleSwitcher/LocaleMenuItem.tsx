import { MenuItem } from '@mui/material'
import { NodotsLocale } from '../../i18n'

interface Props {
  locale: NodotsLocale
  selected: boolean
}

const LocaleMenuItem = ({ locale, selected }: Props) => {
  return (
    <MenuItem key={`language-menu-${locale.code}`} selected={selected}>
      {locale.name}
    </MenuItem>
  )
}

export default LocaleMenuItem
