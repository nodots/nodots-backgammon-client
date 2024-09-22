import { useTranslation } from 'react-i18next'
import { NodotsPlayer } from '../../../../../nodots_modules/backgammon-types'

interface Props {
  player: NodotsPlayer
}
const PlayerStatus = ({ player }: Props) => {
  const { t } = useTranslation()
  return player.isLoggedIn ? t('NDBG_ONLINE') : t('NDBG_OFFLINE')
}

export default PlayerStatus
