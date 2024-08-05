import { Container } from '@mui/material'
import NodotsGameStore from '../../../GameStore'
import {
  Color,
  Completed,
  Confirmed,
  Confirming,
  Moving,
  Rolled,
  Rolling,
  RollingForStart,
} from '../../../GameStore/types'
import NodotsDieComponent from '../NodotsDieComponent'
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

function NodotsRollSurfaceComponent({ store, state, color }: Props) {
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
        <NodotsDieComponent
          order={0}
          color={color}
          state={state}
          store={store}
        />
        <DiceSwitcher store={store} color={color} />
        <NodotsDieComponent
          order={1}
          color={color}
          state={state}
          store={store}
        />
      </div>
    </Container>
  )
}

export default NodotsRollSurfaceComponent
