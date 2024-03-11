import './scss/index.scss'
import { Color, Board as BoardType } from '../../game'
// Components
import Quadrant from '../Quadrant'

import Bar from '../Bar'
import Off from '../Off'
import Rollsurface from '../Rollsurface'
import { Players } from '../../pages/game'

interface Props {
  board: BoardType
  players: Players
}

const Board: React.FC<Props> = ({ board, players }) => {
  return (
    <div id="BoardContainer">
      <div id="West" className="board-half">
        <Quadrant
          latitude="north"
          longitude="west"
          start={13}
          board={board}
          players={players}
        />
        <Rollsurface color="black" />
        <Quadrant
          latitude="south"
          longitude="west"
          start={7}
          board={board}
          players={players}
        />
      </div>
      <Bar />
      <div id="East" className="board-half">
        <Quadrant
          latitude="north"
          longitude="east"
          start={19}
          board={board}
          players={players}
        />
        <Rollsurface color="white" />
        <Quadrant
          latitude="south"
          longitude="east"
          start={1}
          board={board}
          players={players}
        />
      </div>
      <Off />
    </div>
  )
}

export default Board
