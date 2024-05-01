import { observer } from 'mobx-react'
import { NodotsGameState } from '../../GameStore/types'
import {
  getClockwisePlayer,
  getCounterclockwisePlayer,
} from '../../GameStore/types/Player'
import PipCount from './PipCount'
import NodotsGameStore from '../../GameStore'
import { NodotsBoardStore } from '../../GameStore/types/Board'
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
      <PipCount player={clockwisePlayer} />
      <div className="checkerbox counterclockwise">
        {getCheckerComponents(store, clockwiseCheckers)}
      </div>
      <div className="checkerbox clockwise">
        {getCheckerComponents(store, counterclockwiseCheckers)}
      </div>
      <PipCount player={counterclockwisePlayer} />
    </div>
  )
}

export default observer(Bar)
