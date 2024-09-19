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
  switch (game?.NodotsGameRollingForStart) {
    case 'ready':
    case 'rolling-for-start':
    case 'playing-rolling':
    case 'playing-moving':
      return <NodotsOffComponent game={game} player={player} />
  }
}

export default NodotsOff
