import {
  NodotsColor,
  NodotsMoveDirection,
} from '../../../../nodots_modules/backgammon-types'
import { useGameContext } from '../../../Contexts/Game/useGameContext'
import { usePlayerContext } from '../../../Contexts/Player/usePlayerContext'

export const NodotsOffComponent = () => {
  const { gameState, gameDispatch } = useGameContext()
  const { game } = gameState
  const { playerState, playerDispatch } = usePlayerContext()
  const { player } = playerState

  let direction: NodotsMoveDirection | undefined
  let color: NodotsColor | undefined

  switch (game.kind) {
    case 'initializing':
      return <></>
    default: {
      direction = game.players.white.attributes.direction
      color = game.players.white.attributes.color
      return (
        <div id="Off">
          <div className="checkerbox counterclockwise"></div>
          <div className="checkerbox clockwise"></div>
        </div>
      )
    }
  }
}

export default NodotsOffComponent
