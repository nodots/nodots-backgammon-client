import { observer } from 'mobx-react'
import Cube from '../Cube'
import NodotsGameStore from '../../GameStore'
import React from 'react'
import {
  Ready,
  Confirming,
  Rolling,
  RollingForStart,
  Moving,
} from '../../GameStore/types'

interface Props {
  state: Ready | Confirming | Rolling | RollingForStart | Moving
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
