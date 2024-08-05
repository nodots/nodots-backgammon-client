import { observer } from 'mobx-react'
import NodotsGameStore from '../../../GameStore'
import NodotsCubeComponent from '../NodotsCubeComponent'

import {
  getClockwisePlayer,
  getCounterclockwisePlayer,
} from '../../../GameStore/types/Player'
import { Paper } from '@mui/material'
import { getCheckerComponents } from '../NodotsPointComponent'

export interface Props {
  store: NodotsGameStore
}

function Off({ store }: Props) {
  const { state } = store
  const { players, boardStore } = state
  const clockwisePlayer = getClockwisePlayer(players)
  const clockwiseColor = clockwisePlayer.color
  const clockwiseCheckers = boardStore.off[clockwiseColor].checkers
  const counterclockwisePlayer = getCounterclockwisePlayer(players)
  const counterclockwiseColor = counterclockwisePlayer.color
  const counterclockwiseCheckers =
    boardStore.off[counterclockwiseColor].checkers
  return (
    <div id="Off">
      <Paper className="checkercontainer counterclockwise">
        {getCheckerComponents(store, counterclockwiseCheckers, 'off')}
      </Paper>
      <NodotsCubeComponent store={store} />
      <Paper className="checkercontainer clockwise">
        {getCheckerComponents(store, clockwiseCheckers, 'off')}
      </Paper>
    </div>
  )
}

export default observer(Off)
