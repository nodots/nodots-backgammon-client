// Components
import Die from '../Die'
import { Container } from '@mui/material'
import {
  Color,
  Confirming,
  Moving,
  NodotsGameState,
  Ready,
  Rolling,
  RollingForStart,
  confirming,
  rolling,
} from '../../game/Types'
import { Player } from '../../game/player'
import NodotsGameStore from '../../game'
import DiceSwitcher from './DiceSwitcher'
import React from 'react'

interface Props {
  state: RollingForStart | Rolling | Confirming | Ready | Moving
  color: Color
}

const isActive = (activeColor: Color, color: Color) => activeColor === color

function RollSurface({ state, color }: Props) {
  const { players } = state

  const owner = players[color]

  // Event handlers
  const rollHandler = async (e: React.MouseEvent) => {
    e.preventDefault()
    switch (state.kind) {
      case 'ready':
        rolling(state)
        break
      case 'moving':
        confirming(state)
        break
      case 'confirming':
      case 'rolling':
      case 'rolling-for-start':
        break
    }
  }

  return (
    <Container
      className="roll-surface"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="dice-container" onClick={rollHandler}>
        <Die order={0} color={color} state={state} />
        <DiceSwitcher state={state} color={color} />
        <Die order={1} color={color} state={state} />
      </div>
    </Container>
  )
}

export default RollSurface
