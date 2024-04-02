import { observer } from 'mobx-react'
import Cube from '../Cube'
import NodotsGameStore from '../../game'
import React from 'react'

interface Props {
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
