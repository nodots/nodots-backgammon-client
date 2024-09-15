import {
  NodotsGame,
  NodotsPlayer,
} from '../../../../nodots_modules/backgammon-types'
import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'
import { NodotsOffComponent } from './NodotsOffComponent'

interface Props {
  game: NodotsGame
  player: NodotsPlayer
}

const NodotsOff = ({ game, player }: Props) => {
  switch (game?.kind) {
    case 'game-ready':
    case 'game-rolling-for-start':
    case 'game-playing-rolling':
    case 'game-playing-moving':
      return <NodotsOffComponent game={game} player={player} />
  }
}

export default NodotsOff
