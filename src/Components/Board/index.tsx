import './scss/index.scss'
// Components
import Quadrant from '../Quadrant'

import Bar from '../Bar'
import Off from '../Off'
import Rollsurface from '../Rollsurface'
import { Paper, useTheme } from '@mui/material'
import {
  Board as BoardType,
  NodotsGameState,
  Ready,
  Starting,
} from '../../game/Types'

interface Props {
  state: Ready | Starting
  board: BoardType
}

function Board({ state, board }: Props) {
  const { game } = state
  const theme = useTheme()

  return (
    <Paper id="BoardContainer" elevation={2}>
      <Paper id="West" className="board-half" elevation={1}>
        <Quadrant
          latitude="north"
          longitude="west"
          start={13}
          game={state}
          points={game.board.quadrants.west.north.points}
        />
        <Rollsurface game={state} direction="clockwise" />
        <Quadrant
          latitude="south"
          longitude="west"
          start={7}
          game={state}
          points={game.board.quadrants.west.south.points}
        />
      </Paper>
      <Bar game={game} />
      <Paper id="East" className="board-half" elevation={1}>
        <Quadrant
          latitude="north"
          longitude="east"
          start={19}
          game={state}
          points={game.board.quadrants.east.north.points}
        />
        <Rollsurface game={state} direction="counterclockwise" />
        <Quadrant
          latitude="south"
          longitude="east"
          start={1}
          game={state}
          points={game.board.quadrants.east.south.points}
        />
      </Paper>
      <Off game={state} />
    </Paper>
  )
}

export default Board
