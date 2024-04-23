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
  const rollHandler = async (e: React.MouseEvent) => {
    e.preventDefault()
    switch (state.kind) {
      case 'rolling':
        console.log('RollSurface rolling:')
        store.rolling(state)
        break
      case 'moving':
        store.confirming(state)
        break
      default:
        console.log('rollHandler no action')
      // store.confirming(state)
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
