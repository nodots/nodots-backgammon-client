import { observer } from 'mobx-react'
import Cube from '../Cube'
import NodotsGameStore from '../../GameStore'
import React from 'react'
import {
  Confirming,
  Rolling,
  RollingForStart,
  Moving,
} from '../../GameStore/types'

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
