import { observer } from 'mobx-react'
import Cube from '../Cube'
import NodotsGameStore from '../../game'
import React from 'react'
import {
  Ready,
  Confirming,
  Rolling,
  RollingForStart,
  Moving,
} from '../../game/Types'

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
