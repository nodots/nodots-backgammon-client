// Components
import Die from '../Die'
import { Container, useTheme } from '@mui/material'
import { Color, MoveDirection, NodotsGameState } from '../../game/Types'
import { Player } from '../../game/player'
import NodotsGameStore from '../../game'
import DiceSwitcher from './DiceSwitcher'

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
        <Die order={0} color={color} value={roll[0]} state={state} />
        <DiceSwitcher state={state} store={store} color={color} />
        <Die order={1} color={color} value={roll[1]} state={state} />
      </div>
    </Container>
  )
}

export default RollSurface
