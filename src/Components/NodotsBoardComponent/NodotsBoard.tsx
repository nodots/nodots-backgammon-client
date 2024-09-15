import { Paper } from '@mui/material'
import { QuadrantPoints } from '.'
import {
  NodotsColor,
  NodotsGame,
  NodotsPlayer,
} from '../../../nodots_modules/backgammon-types'
import { useNodotsGame } from '../../Contexts/Game/useNodotsGame'
import { Loading } from '../Loading'
import NodotsBarComponent from './NodotsBarComponent'
import NodotsOffComponent from './NodotsOffComponent'
import NodotsQuadrantComponent from './NodotsQuadrantComponent'
import NodotsRollSurfaceComponent from './NodotsRollSurfaceComponent'
import NodotsBoardHalf from './NodotsBoardHalf'

interface Props {
  game: NodotsGame
  player: NodotsPlayer
}
export const NodotsBoard = ({ game, player }: Props) => {
  return (
    <div id="BoardContainer">
      <NodotsBoardHalf game={game} player={player} longitude="west" />
      <NodotsBarComponent game={game} player={player} />
      <NodotsBoardHalf game={game} player={player} longitude="east" />
    </div>
  )
}
