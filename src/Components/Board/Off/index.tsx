import { observer } from 'mobx-react'
import Cube from '../Cube'
import { getCheckerComponents } from '../Point'
import { Paper } from '@mui/material'
import { NodotsGame } from '../../../stores/Game'
import {
  getClockwisePlayer,
  getCounterclockwisePlayer,
} from '../../../stores/Player/helpers'

export interface Props {
  store: NodotsGame
}

function Off({ store }: Props) {
  const { players, board } = store
  const clockwisePlayer = getClockwisePlayer(players)
  const clockwiseColor = clockwisePlayer.color
  const clockwiseCheckers = board.off[clockwiseColor].checkers
  const counterclockwisePlayer = getCounterclockwisePlayer(players)
  const counterclockwiseColor = counterclockwisePlayer.color
  const counterclockwiseCheckers = board.off[counterclockwiseColor].checkers
  return (
    <div id="Off">
      <Paper className="checkercontainer counterclockwise">
        {getCheckerComponents(store, counterclockwiseCheckers, 'off')}
      </Paper>
      <Cube store={store} />
      <Paper className="checkercontainer clockwise">
        {getCheckerComponents(store, clockwiseCheckers, 'off')}
      </Paper>
    </div>
  )
}

export default observer(Off)
