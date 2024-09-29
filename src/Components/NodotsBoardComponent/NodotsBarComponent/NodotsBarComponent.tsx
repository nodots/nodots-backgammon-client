import {
  NodotsColor,
  NodotsGame,
  NodotsMoveDirection,
  NodotsPlayerPlaying,
  NodotsPlayerReady,
} from '../../../../nodots_modules/backgammon-types'
import { useGameContext } from '../../../Contexts/Game/useGameContext'
import NodotsPipCountComponent from '../NodotsPipCountComponent'
import { getCheckerComponents } from '../NodotsPointComponent'

export const NodotsBarComponent = () => {
  const { gameState, gameDispatch } = useGameContext()
  const { game } = gameState

  return (
    <div id="Bar">
      <NodotsPipCountComponent direction="counterclockwise" />
      <div className="checkerbox counterclockwise"></div>
      <div className="checkerbox clockwise"></div>
      <NodotsPipCountComponent direction="clockwise" />
    </div>
  )
}
