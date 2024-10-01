import { QuadrantPoints } from '..'
import {
  Longitude,
  NodotsGame,
  NodotsPlayer,
  NodotsPlayersPlaying,
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
  const { game } = useGameContext()
  const northStart = longitude === 'west' ? 19 : 13
  const southStart = longitude === 'east' ? 1 : 7

  const getColor = () => {
    switch (game?.kind) {
      case 'initializing':
      case 'ready':
        break
      case 'rolling-for-start':
      case 'moving':
      case 'rolling':
        const player1 = game.players[0]
        const player2 = game.players[1]

      // if (longitude === 'east') {
      //   return game.players.white.attributes.direction === 'clockwise'
      //     ? 'white'
      //     : 'black'
      // } else {
      //   return game.players.white.attributes.direction === 'counterclockwise'
      //     ? 'white'
      //     : 'black'
      // }
    }
  }

  switch (game?.kind) {
    case 'initializing':
      return <Loading message="NodotsBoardHalf loading game" />
    case 'rolling-for-start':
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
