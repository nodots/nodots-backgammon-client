import { observer } from 'mobx-react'
import NodotsGameStore from '../../GameStore'
import Cube from '../Cube'

export interface Props {
  store: NodotsGameStore
}

function Off({ store }: Props) {
  return (
    <div id="Off">
      <div className="checkerbox clockwise"></div>
      <Cube store={store} />
      <div className="checkerbox counterclockwise"></div>
    </div>
  )
}

export default observer(Off)
