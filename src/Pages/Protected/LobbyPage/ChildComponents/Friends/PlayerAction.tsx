import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NodotsPlayerActive } from '../../../../../../nodots_modules/backgammon-types'
import { usePlayerContext } from '../../../../../Contexts/Player/usePlayerContext'
interface Props {
  opponent: NodotsPlayerActive
}

export const PlayerAction = ({ opponent }: Props) => {
  const { t } = useTranslation()
  const { state, dispatch } = usePlayerContext()
  const handleClick = async (e: React.MouseEvent) => {
    console.log('START GAME')
  }
  return <Button onClick={handleClick}>{t('NDBG_START_GAME')}</Button>
}
