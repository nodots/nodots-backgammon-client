import { observer } from 'mobx-react'
import { NodotsGameState } from '../../game/Types'
import PipCount from './PipCount'

interface Props {
  state: NodotsGameState
}

function Bar({ state }: Props) {
  const { game } = state
  return (
    <div id="Bar">
      <PipCount player={game.getCounterclockwisePlayer()} />
      <div className="checkerbox counterclockwise"></div>
      <div className="checkerbox clockwise"></div>
      <PipCount player={game.getClockwisePlayer()} />
    </div>
  )
}

export default observer(Bar)
