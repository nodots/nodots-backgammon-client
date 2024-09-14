import { QuadrantPoints } from '..'
import {
  Longitude,
  NodotsColor,
  NodotsGame,
} from '../../../../nodots_modules/backgammon-types'
import NodotsQuadrantComponent from '../NodotsQuadrantComponent'
import NodotsRollSurfaceComponent from '../NodotsRollSurfaceComponent'

interface Props {
  game: NodotsGame
  longitude: Longitude
}

const NodotsBoardHalf = ({ game, longitude }: Props) => {
  console.log('[NodotsBoardHalf] game:', game)
  console.log('[NodotsBoardHalf] longitude:', longitude)

  return (
    <>
      <NodotsQuadrantComponent
        game={game}
        latitude="north"
        longitude={longitude}
        start={19}
        points={game.board.points.slice(18, 24) as QuadrantPoints}
      />
      <NodotsRollSurfaceComponent game={game} longitude={longitude} />
      <NodotsQuadrantComponent
        game={game}
        latitude="south"
        longitude={longitude}
        start={1}
        points={game.board.points.slice(0, 6) as QuadrantPoints}
      />
    </>
  )
}

export default NodotsBoardHalf
