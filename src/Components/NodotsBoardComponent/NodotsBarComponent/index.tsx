import {
  NodotsGame,
  NodotsPlayer,
} from '../../../../nodots_modules/backgammon-types'
import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'
import { NodotsBarComponent } from './NodotsBarComponent'

interface Props {
  game: NodotsGame
  player: NodotsPlayer
}

const NodotsBar = ({ game, player }: Props) => {
  switch (game?.NodotsGameRollingForStart) {
    case 'ready':
    case 'rolling-for-start':
    case 'playing-rolling':
    case 'playing-moving':
      return <NodotsBarComponent game={game} player={player} />
  }
}

export default NodotsBar
