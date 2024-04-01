import { observer } from 'mobx-react'
import { NodotsGameState } from '../../game/Types'
import Cube from '../Cube'

interface Props {
  state: NodotsGameState
}

function Off({ state }: Props) {
  return (
    <div id="Off">
      <div className="checkerbox clockwise"></div>
      <Cube state={state} />
      <div className="checkerbox counterclockwise"></div>
    </div>
  )
}

export default observer(Off)
