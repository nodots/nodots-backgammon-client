import '../../scss/index.scss'
import {
  NodotsGame,
  Point,
  NodotsCheckercontainer,
  Latitude,
  Longitude,
  Player,
} from '../../../nodots_modules/backgammon-types/index'
import { UTBoardTheme } from '../../theme/AppTheme'
import NodotsQuadrantComponent from './NodotsQuadrantComponent'
import NodotsRollSurfaceComponent from './NodotsRollSurfaceComponent'
import NodotsBarComponent from './NodotsBarComponent'
import Off from './NodotsOffComponent/NodotsOffComponent'
// import { useNodotsGame } from '../../Contexts/Game/useNodotsGame'
import { NodotsBoardComponent } from './NodotsBoardComponent'
import { useTheme } from '@mui/material'

export type QuadrantPoints = [Point, Point, Point, Point, Point, Point]

export interface QuadrantProps {
  latitude: Latitude
  longitude: Longitude
  start: number
  points: QuadrantPoints
}

export type Quadrants = [
  QuadrantProps,
  QuadrantProps,
  QuadrantProps,
  QuadrantProps
]

export interface BoardDisplay {
  quadrants: Quadrants
  bar: {
    white: NodotsCheckercontainer
    black: NodotsCheckercontainer
  }
  off: {
    white: NodotsCheckercontainer
    black: NodotsCheckercontainer
  }
}

interface Props {
  game: NodotsGame
  player: Player
}

function BoardComponent({ game, player }: Props) {
  const boardTheme = useTheme()
  return (
    <div id="GameContainer">
      <NodotsBoardComponent player={player} game={game} />
    </div>
  )
}

export default BoardComponent
