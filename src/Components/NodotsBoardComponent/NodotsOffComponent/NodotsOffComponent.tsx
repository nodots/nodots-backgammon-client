import {
  NodotsColor,
  NodotsMoveDirection,
} from '../../../../nodots_modules/backgammon-types'
import { useGameContext } from '../../../Contexts/Game/useGameContext'
import { usePlayerContext } from '../../../Contexts/Player/usePlayerContext'

export const NodotsOffComponent = () => {
  const { game } = useGameContext()

  return game?.players ? (
    <></>
  ) : (
    <div id="Off">
      <div className="checkerbox counterclockwise"></div>
      <div className="checkerbox clockwise"></div>
    </div>
  )
}

export default NodotsOffComponent
