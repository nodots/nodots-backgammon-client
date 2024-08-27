import { SelectChangeEvent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { NodotsLocale, NodotsLocaleCode, NodotsLocales } from '../../i18n'
import { useAuth0 } from '@auth0/auth0-react'
import useNodotsGame from '../../Hooks/GameHook'
import LocaleMenu from './LocaleMenu'

interface Props {
  actionFunction?: (event: SelectChangeEvent<NodotsLocale>) => void
}

const LocaleSwitcher = ({ actionFunction }: Props) => {
  const { updatePlayerPreferences } = useNodotsGame()
  const { user, isAuthenticated } = useAuth0()
  const { t, i18n } = useTranslation()
  const [locale, setLocale] = useState(i18n.language)

  return <LocaleMenu />
}

export default LocaleSwitcher
