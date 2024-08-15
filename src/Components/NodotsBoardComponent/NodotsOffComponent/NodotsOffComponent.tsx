import { Paper } from '@mui/material'
import { getCheckerComponents } from '../NodotsPointComponent'
import { NodotsGameStateReady } from '../../../../nodots_modules/backgammon-types'
import useNodotsGame from '../../../Hooks/GameHook'
import NodotsCubeComponent from '../NodotsCubeComponent'

function NodotsOffComponent() {
  const { game, getCheckersForDirection, getPlayerForDirection } =
    useNodotsGame()
  const _game = game as NodotsGameStateReady
  const clockwisePlayer = getPlayerForDirection('clockwise', _game.players)
  const clockwiseColor = clockwisePlayer.color
  const clockwiseCheckers = getCheckersForDirection(
    'clockwise',
    _game.players,
    _game.board
  )
  const counterclockwisePlayer = getPlayerForDirection(
    'counterclockwise',
    _game.players
  )
  const counterclockwiseColor = clockwisePlayer.color
  const counterclockwiseCheckers = getCheckersForDirection(
    'counterclockwise',
    _game.players,
    _game.board
  )
  return (
    <div id="Off">
      <Paper className="checkercontainer counterclockwise">
        {getCheckerComponents(_game, counterclockwiseCheckers, 'off')}
      </Paper>
      <NodotsCubeComponent />
      <Paper className="checkercontainer clockwise">
        {getCheckerComponents(_game, clockwiseCheckers, 'off')}
      </Paper>
    </div>
  )
}

export default NodotsOffComponent
