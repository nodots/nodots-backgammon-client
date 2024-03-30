import { GameState } from '../../game/game.state'
import Cube from '../Cube'

interface Props {
  game: GameState
}

function Off({ game }: Props) {
  return (
    <div id="Off">
      <div className="checkerbox clockwise"></div>
      <Cube game={game} />
      <div className="checkerbox counterclockwise"></div>
    </div>
  )
}

export default Off
