import { GameState } from '../../game'
import PipCount from './PipCount'

interface Props {
  game: GameState
}

function Bar({ game }: Props) {
  return (
    <div id="Bar">
      {/* <PipCount player={game.getClockwisePlayer()} /> */}
      <div className="checkerbox counterclockwise"></div>
      <div className="checkerbox clockwise"></div>
      {/* <PipCount player={game.getCounterclockwisePlayer()} /> */}
    </div>
  )
}

export default Bar
