import './scss/index.scss'
import { Color, Board as BoardType } from '../../game'
// Components
import Quadrant from '../Quadrant'

import Bar from '../Bar'
import Off from '../Off'
import Rollsurface from '../Rollsurface'
import { Players } from '../../pages/game'
import Checker from '../Checker'
import { generateId } from '../../game/game'
import { useTheme } from '@mui/material'

interface Props {
  board: BoardType
  players: Players
}

const Board: React.FC<Props> = ({ board, players }) => {
  const theme = useTheme()
  return (
    <div
      id="BoardContainer"
      style={{ borderColor: theme.palette.secondary.light }}
    >
      <div
        id="West"
        className="board-half"
        style={{ borderColor: theme.palette.secondary.light }}
      >
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
      <div
        id="East"
        className="board-half"
        style={{ borderColor: theme.palette.secondary.light }}
      >
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
