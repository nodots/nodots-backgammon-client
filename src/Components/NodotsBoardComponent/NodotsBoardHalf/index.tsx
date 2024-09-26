import { QuadrantPoints } from '..'
import {
  Longitude,
  NodotsGame,
  NodotsPlayer,
} from '../../../../nodots_modules/backgammon-types'
import NodotsQuadrantComponent from '../NodotsQuadrantComponent'
import NodotsRollSurfaceComponent from '../NodotsRollSurfaceComponent'

interface Props {
  longitude: Longitude
}

const NodotsBoardHalf = ({ longitude }: Props) => {
  console.log('[NodotsBoardHalf] game:', game)
  console.log('[NodotsBoardHalf] player:', player)
  console.log('[NodotsBoardHalf] longitude:', longitude)
  const northStart = longitude === 'west' ? 19 : 13
  const southStart = longitude === 'east' ? 1 : 7

  return (
    <div className="board-half">
      <NodotsQuadrantComponent
        game={game}
        player={player}
        latitude="north"
        longitude={longitude}
        start={northStart}
      />
      <NodotsRollSurfaceComponent
        game={game}
        player={player}
        longitude={longitude}
      />
      <NodotsQuadrantComponent
        game={game}
        player={player}
        latitude="south"
        longitude={longitude}
        start={southStart}
      />
    </div>
  )
}

export default NodotsBoardHalf
