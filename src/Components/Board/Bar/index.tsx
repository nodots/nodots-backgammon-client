import { observer } from 'mobx-react'
import PipCount from '../PipCount'
import { getCheckerComponents } from '../Point'
import RevertMove from '../RevertMove'
import {
  getClockwisePlayer,
  getCounterclockwisePlayer,
} from '../../../stores/Player/helpers'
import { NodotsGame } from '../../../stores/Game'

export interface Props {
  store: NodotsGame
}

function Bar({ store }: Props) {
  const { players, board } = store
  const clockwisePlayer = getClockwisePlayer(players)
  const clockwiseColor = clockwisePlayer.color
  const clockwiseCheckers = board.bar[clockwiseColor].checkers
  const counterclockwisePlayer = getCounterclockwisePlayer(players)
  const counterclockwiseColor = counterclockwisePlayer.color
  const counterclockwiseCheckers = board.bar[counterclockwiseColor].checkers
  return (
    <div id="Bar">
      <PipCount player={counterclockwisePlayer} />
      <div className="checkerbox counterclockwise">
        {getCheckerComponents(store, clockwiseCheckers, 'bar')}
      </div>
      <div>
        <RevertMove store={store} />
      </div>
      <div className="checkerbox clockwise">
        {getCheckerComponents(store, counterclockwiseCheckers, 'bar')}
      </div>
      <PipCount player={clockwisePlayer} />
    </div>
  )
}

export default observer(Bar)
