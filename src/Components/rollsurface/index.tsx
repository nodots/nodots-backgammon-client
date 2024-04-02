// Components
import Die from '../Die'

// MUI
import SyncAltIcon from '@mui/icons-material/SyncAlt'

import { Container, useTheme } from '@mui/material'
import { Color, MoveDirection, NodotsGameState } from '../../game/Types'
import { Player } from '../../game/player'
import NodotsGameStore from '../../game'

interface Props {
  state: NodotsGameState
  store: NodotsGameStore
  color: Color
}

const isActive = (activePlayer: Player, color: Color) =>
  activePlayer.color === color

function RollSurface({ state, store, color }: Props) {
  const { game, roll, players } = state

  const owner = players[color]
  console.log(owner.dice)

  // Event handlers
  const rollHandler = async (e: React.MouseEvent) => {
    e.preventDefault()
    switch (state.kind) {
      case 'confirming':
      case 'moving':
      case 'rolling':
        break
      case 'ready':
        store.rolling(state)
    }
  }

  const swapDiceHandler = (e: React.MouseEvent) => {
    console.warn('swap dice handler not implemented')
  }

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className={'dice-container'} onClick={rollHandler}>
        <Die order={0} color={color} value={roll[0]} state={state} />
        <Die order={1} color={color} value={roll[1]} state={state} />
      </div>
    </Container>
  )
}

export default RollSurface
