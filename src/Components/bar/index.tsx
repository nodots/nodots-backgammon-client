import { observer } from 'mobx-react'
import { NodotsGameState } from '../../GameStore/types'
import {
  getClockwisePlayer,
  getCounterclockwisePlayer,
} from '../../GameStore/types/Player'
import PipCount from './PipCount'
import NodotsGameStore from '../../GameStore'
import { NodotsBoardStore } from '../../GameStore/types/Board'

export interface Props {
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
