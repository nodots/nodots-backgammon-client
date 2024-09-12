import '../../scss/index.scss'
import {
  NodotsGame,
  Point,
  NodotsCheckercontainer,
} from '../../../nodots_modules/backgammon-types/index'
import NodotsQuadrantComponent from './NodotsQuadrantComponent'
import NodotsRollSurfaceComponent from './NodotsRollSurfaceComponent'
import NodotsBarComponent from './NodotsBarComponent'
import Off from './NodotsOffComponent/NodotsOffComponent'
// import { useNodotsGame } from '../../Contexts/Game/useNodotsGame'
import { NodotsBoardComponent } from './NodotsBoardComponent'

export type QuadrantPoints = [Point, Point, Point, Point, Point, Point]

export interface QuadrantProps {
  latitude: 'north' | 'south'
  longitude: 'east' | 'west'
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
}

function NodotsBoard({ game }: Props) {
  switch (game.kind) {
    case 'game-initializing':
      return <></>
    case 'game-initialized':
    case 'game-rolling-for-start':
    case 'game-playing-moving':
    case 'game-playing-rolling':
      return <NodotsBoardComponent />
  }
}

export default NodotsBoardComponent
