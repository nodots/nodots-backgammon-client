import { QuadrantPoints } from '..'
import {
  Longitude,
  NodotsGame,
  NodotsPlayer,
} from '../../../../nodots_modules/backgammon-types'
import { useGameContext } from '../../../Contexts/Game/useGameContext'
import { usePlayerContext } from '../../../Contexts/Player/usePlayerContext'
import { Loading } from '../../utils/Loading'
import NodotsQuadrantComponent from '../NodotsQuadrantComponent'
import NodotsRollSurfaceComponent from '../NodotsRollSurfaceComponent'

interface Props {
  longitude: Longitude
}

const NodotsBoardHalf = ({ longitude }: Props) => {
  const { gameState, gameDispatch } = useGameContext()
  const { game } = gameState
  const northStart = longitude === 'west' ? 19 : 13
  const southStart = longitude === 'east' ? 1 : 7

  switch (game.kind) {
    case 'initializing':
      return <Loading message="NodotsBoardHalf loading game" />
    default:
      return (
        <div className="board-half">
          <NodotsQuadrantComponent
            latitude="north"
            longitude={longitude}
            start={northStart}
          />
          <NodotsRollSurfaceComponent longitude={longitude} />
          <NodotsQuadrantComponent
            latitude="south"
            longitude={longitude}
            start={southStart}
          />
        </div>
      )
  }
}

export default NodotsBoardHalf
