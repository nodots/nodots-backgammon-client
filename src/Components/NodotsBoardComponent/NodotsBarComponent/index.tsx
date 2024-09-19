import { NodotsGame, Player } from '../../../../nodots_modules/backgammon-types'
import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'
import { NodotsBarComponent } from './NodotsBarComponent'

interface Props {
  game: NodotsGame
  player: Player
}

const NodotsBar = ({ game, player }: Props) => {
  switch (game?.kind) {
    case 'game-ready':
    case 'game-rolling-for-start':
    case 'game-playing-rolling':
    case 'game-playing-moving':
      return <NodotsBarComponent game={game} player={player} />
  }
}

export default NodotsBar
