import { Container } from '@mui/material'
import NodotsGameStore from '../../../GameStore'
import {
  Color,
  GameCompleted,
  GamePlayConfirmed,
  GameConfirmingPlay,
  GameMoving,
  GameRolled,
  GameRolling,
  GameRollingForStart,
  GameDiceSwitched,
  GameDoubling,
  GameDoubled,
} from '../../../GameStore/types'
import Die from '../Dice'
import DiceSwitcher from '../DiceSwitcher'

interface Props {
  store: NodotsGameStore
  state:
    | GameDiceSwitched
    | GameRollingForStart
    | GameRolling
    | GameRolled
    | GameConfirmingPlay
    | GamePlayConfirmed
    | GameDoubling
    | GameDoubled
    | GameMoving
    | GameCompleted
  color: Color
}

const isActive = (activeColor: Color, color: Color) => activeColor === color

function RollSurface({ store, state, color }: Props) {
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
        <DiceSwitcher store={store} color={color} />
        <Die order={1} color={color} state={state} store={store} />
      </div>
    </Container>
  )
}

export default RollSurface
