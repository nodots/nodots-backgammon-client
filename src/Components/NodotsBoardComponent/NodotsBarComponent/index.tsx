import { observer } from 'mobx-react'
import {
  getClockwisePlayer,
  getCounterclockwisePlayer,
} from '../../../GameStore/types/Player'
import NodotsPipCountComponent from '../NodotsPipCountComponent'
import NodotsGameStore from '../../../GameStore'
import { getCheckerComponents } from '../NodotsPointComponent'

export interface Props {
  store: NodotsGameStore
}

function NodotsBarComponent({ store }: Props) {
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
      <NodotsPipCountComponent player={counterclockwisePlayer} />
      <div className="checkerbox counterclockwise">
        {getCheckerComponents(store, clockwiseCheckers, 'bar')}
      </div>
      <div className="checkerbox clockwise">
        {getCheckerComponents(store, counterclockwiseCheckers, 'bar')}
      </div>
      <NodotsPipCountComponent player={clockwisePlayer} />
    </div>
  )
}

export default observer(NodotsBarComponent)
