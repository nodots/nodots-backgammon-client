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
  const northStart = longitude === 'west' ? 19 : 13
  const southStart = longitude === 'west' ? 1 : 7

  return (
    <>
      <NodotsQuadrantComponent
        game={game}
        latitude="north"
        longitude={longitude}
        start={northStart}
      />
      {/* <NodotsRollSurfaceComponent game={game} longitude={longitude} /> */}
      <NodotsQuadrantComponent
        game={game}
        latitude="south"
        longitude={longitude}
        start={southStart}
      />
    </>
  )
}

export default NodotsBoardHalf
