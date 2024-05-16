import { observer } from 'mobx-react'
import NodotsGameStore from '../../GameStore'
import Cube from '../Cube'
import { getCheckerComponents } from '../Point'
import {
  getClockwisePlayer,
  getCounterclockwisePlayer,
} from '../../GameStore/types/Player'

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
      <div className="checkercontainer counterclockwise">
        {getCheckerComponents(store, counterclockwiseCheckers, 'off')}
      </div>
      <Cube store={store} />
      <div className="checkercontainer clockwise">
        {getCheckerComponents(store, clockwiseCheckers, 'off')}
      </div>
    </div>
  )
}

export default observer(Off)
