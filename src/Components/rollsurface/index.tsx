import { Container } from '@mui/material'
import NodotsGameStore from '../../GameStore'
import {
  Color,
  Completed,
  Confirmed,
  Confirming,
  Moving,
  Rolled,
  Rolling,
  RollingForStart,
} from '../../GameStore/types'
import Die from '../Die'
import DiceSwitcher from './DiceSwitcher'

interface Props {
  store: NodotsGameStore
  state:
    | RollingForStart
    | Rolling
    | Rolled
    | Confirming
    | Confirmed
    | Moving
    | Completed
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
