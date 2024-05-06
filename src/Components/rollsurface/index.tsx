// Components
import Die from '../Die'
import { Container } from '@mui/material'
import {
  Color,
  Confirming,
  Moving,
  Rolling,
  Rolled,
  RollingForStart,
} from '../../GameStore/types'
import { Player } from '../../GameStore/types/Player'
import NodotsGameStore from '../../GameStore'
import DiceSwitcher from './DiceSwitcher'
import React from 'react'

interface Props {
  store: NodotsGameStore
  state: RollingForStart | Rolling | Confirming | Moving | Rolled
  color: Color
}

const isActive = (activeColor: Color, color: Color) => activeColor === color

function RollSurface({ store, state, color }: Props) {
  const { players } = state

  const owner = players[color]

  // Event handlers

  return (
    <Container
      className="roll-surface"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="dice-container">
        <Die order={0} color={color} state={state} store={store} />
        <DiceSwitcher color={color} store={store} />
        <Die order={1} color={color} state={state} store={store} />
      </div>
    </Container>
  )
}

export default RollSurface
