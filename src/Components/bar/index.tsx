import { observer } from 'mobx-react'
import { NodotsGameState } from '../../game/Types'
import {
  getClockwisePlayer,
  getCounterclockwisePlayer,
} from '../../game/player'
import PipCount from './PipCount'

interface Props {
  state: NodotsGameState
}

function Bar({ state }: Props) {
  const { players } = state
  return (
    <div id="Bar">
      <PipCount player={getCounterclockwisePlayer(players)} />
      <div className="checkerbox counterclockwise"></div>
      <div className="checkerbox clockwise"></div>
      <PipCount player={getClockwisePlayer(players)} />
    </div>
  )
}

export default observer(Bar)
