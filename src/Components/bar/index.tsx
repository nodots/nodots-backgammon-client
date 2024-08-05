import { observer } from 'mobx-react'
import {
  getClockwisePlayer,
  getCounterclockwisePlayer,
} from '../../GameStore/types/Player'
import PipCount from '../PipCount'
import NodotsGameStore from '../../GameStore'
import { getCheckerComponents } from '../Point'

export interface Props {
  store: NodotsGameStore
}

function Bar({ store }: Props) {
  const { state } = store
  const { players, boardStore } = state
  const clockwisePlayer = getClockwisePlayer(players)
  const clockwiseColor = clockwisePlayer.color
  const clockwiseCheckers = boardStore.bar[clockwiseColor].checkers
  const counterclockwisePlayer = getCounterclockwisePlayer(players)
  const counterclockwiseColor = counterclockwisePlayer.color
  const counterclockwiseCheckers =
    boardStore.bar[counterclockwiseColor].checkers
  return (
    <div id="Bar">
      <PipCount player={counterclockwisePlayer} />
      <div className="checkerbox counterclockwise">
        {getCheckerComponents(store, clockwiseCheckers, 'bar')}
      </div>
      <div className="checkerbox clockwise">
        {getCheckerComponents(store, counterclockwiseCheckers, 'bar')}
      </div>
      <PipCount player={clockwisePlayer} />
    </div>
  )
}

export default observer(Bar)
