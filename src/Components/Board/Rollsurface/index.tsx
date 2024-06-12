import { Container } from '@mui/material'
import { Color } from '../../../stores/Types'
import Die from '../Dice'
import DiceSwitcher from '../DiceSwitcher'
import { NodotsGame } from '../../../stores/Game'

interface Props {
  store: NodotsGame
  color: Color
}

const isActive = (activeColor: Color, color: Color) => activeColor === color

function RollSurface({ store, color }: Props) {
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
        <Die order={0} color={color} store={store} />
        <DiceSwitcher store={store} color={color} />
        <Die order={1} color={color} store={store} />
      </div>
    </Container>
  )
}

export default RollSurface
