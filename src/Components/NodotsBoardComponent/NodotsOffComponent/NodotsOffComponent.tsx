import { Paper } from '@mui/material'
import { getCheckerComponents } from '../NodotsPointComponent'
import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'
import NodotsCubeComponent from '../NodotsCubeComponent'
import {
  NodotsColor,
  NodotsGame,
  NodotsMoveDirection,
} from '../../../../nodots_modules/backgammon-types'
import NodotsCheckerComponent from '../NodotsCheckerComponent'

interface Props {
  game: NodotsGame
  color: NodotsColor
}

function NodotsOffComponent({ game, color }: Props) {
  const counterClockwiseColor: NodotsColor =
    game.players.white.direction === 'counterclockwise' ? 'white' : 'black'
  const clockwiseColor: NodotsColor =
    counterClockwiseColor === 'white' ? 'black' : 'white'

  const clockwiseCheckers = game.board.off[clockwiseColor].checkers.map((c) => {
    return <NodotsCheckerComponent key={c.id} checker={c} game={game} />
  })
  const counterclockwiseCheckers = game.board.off[clockwiseColor].checkers.map(
    (c) => {
      return <NodotsCheckerComponent key={c.id} checker={c} game={game} />
    }
  )

  const getCheckerComponents = (direction: NodotsMoveDirection) => {
    return direction === 'clockwise'
      ? clockwiseCheckers
      : counterclockwiseCheckers
  }

  return (
    <div id="Off">
      <Paper className="checkercontainer counterclockwise">
        {getCheckerComponents('counterclockwise')}
      </Paper>
      <NodotsCubeComponent />
      <Paper className="checkercontainer clockwise">
        {getCheckerComponents('clockwise')}
      </Paper>
    </div>
  )
}

export default NodotsOffComponent
