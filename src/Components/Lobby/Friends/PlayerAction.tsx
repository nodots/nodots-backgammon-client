import { NodotsPlayer } from '../../../../nodots_modules/backgammon-types'

interface Props {
  player: NodotsPlayer
}
const PlayerStatus = ({ player }: Props) => {
  if (player.isLoggedIn) {
    switch (player.kind) {
      case 'player-initialized':
      case 'player-seeking-game':
        return player.isLoggedIn ? 'Play' : ''
      case 'player-playing':
        return 'Playing'
    }
  }
}

export default PlayerStatus
