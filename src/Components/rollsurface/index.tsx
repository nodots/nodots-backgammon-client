// Components
import Die from '../Die'
import { Container } from '@mui/material'
import { Color, NodotsGameState } from '../../game/Types'
import { Player } from '../../game/player'
import NodotsGameStore from '../../game'
import DiceSwitcher from './DiceSwitcher'
import React from 'react'

interface Props {
  state: NodotsGameState
  store: NodotsGameStore
  color: Color
}

const isActive = (activeColor: Color, color: Color) => activeColor === color

function RollSurface({ state, store, color }: Props) {
  const { game } = state
  const { roll, players } = game

  const owner = players[color]

  // Event handlers
  const rollHandler = async (e: React.MouseEvent) => {
    e.preventDefault()
    store.notify(state, { debug: `Rolling w ${state.kind}` })
    switch (state.kind) {
      case 'moving':
      case 'ready':
        break

      case 'roll-for-start':
        store.rolling(state)
        break
      case 'confirming':
        store.confirming(state)
        console.log(state)
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
        <Die
          order={0}
          color={color}
          value={roll[0] ? roll[0] : 1}
          state={state}
        />
        <DiceSwitcher state={state} store={store} color={color} />
        <Die
          order={1}
          color={color}
          value={roll[1] ? roll[1] : 1}
          state={state}
        />
      </div>
    </Container>
  )
}

export default RollSurface
