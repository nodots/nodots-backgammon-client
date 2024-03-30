import './scss/index.scss'
import { Color, Board as BoardType } from '../../game'
// Components
import Quadrant from '../Quadrant'

import Bar from '../Bar'
import Off from '../Off'
import Rollsurface from '../Rollsurface'
import Checker from '../Checker'
import { GameState } from '../../game/game.state'
import { Paper, useTheme } from '@mui/material'

interface Props {
  game: GameState
}

function Board({ game }: Props) {
  const { board, players } = game
  const theme = useTheme()
  return (
    <Paper id="BoardContainer" elevation={2}>
      <Paper id="West" className="board-half" elevation={1}>
        <Quadrant
          latitude="north"
          longitude="west"
          start={13}
          board={board}
          players={players}
        />
        {/* FIXME: shouldn't be color should be move direction */}
        <Rollsurface game={game} color="black" />
        <Quadrant
          latitude="south"
          longitude="west"
          start={7}
          board={board}
          players={players}
        />
      </Paper>
      <Bar />
      <Paper id="East" className="board-half" elevation={1}>
        <Quadrant
          latitude="north"
          longitude="east"
          start={19}
          board={board}
          players={players}
        />
        <Rollsurface game={game} color="white" />
        <Quadrant
          latitude="south"
          longitude="east"
          start={1}
          board={board}
          players={players}
        />
      </Paper>
      <Off game={game} />
    </Paper>
  )
}

export default Board
