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
} from '../../GameStore/types'
import { Player } from '../../GameStore/types/Player'
import NodotsGameStore from '../../GameStore'
import DiceSwitcher from './DiceSwitcher'
import React from 'react'

interface Props {
  store: NodotsGameStore
  state: RollingForStart | Rolling | Confirming | Moving | Ready
  color: Color
}

const isActive = (activeColor: Color, color: Color) => activeColor === color

function RollSurface({ store, state, color }: Props) {
  const { players } = state

  const owner = players[color]

  // Event handlers
  const rollHandler = async (e: React.MouseEvent) => {
    e.preventDefault()
    switch (state.kind) {
      case 'ready':
        store.rolling(state)
        break
      case 'moving':
        store.confirming(state)
        break
      case 'confirming':
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
