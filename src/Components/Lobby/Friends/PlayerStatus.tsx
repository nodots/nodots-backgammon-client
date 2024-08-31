import { NodotsPlayer } from '../../../../nodots_modules/backgammon-types'

interface Props {
  player: NodotsPlayer
}
const PlayerStatus = ({ player }: Props) => {
  return player.isLoggedIn ? 'Online' : 'Offline'
}

export default PlayerStatus
