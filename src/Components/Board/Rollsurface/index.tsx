import { Container } from '@mui/material'
import Die from '../Dice'
import DiceSwitcher from '../DiceSwitcher'
import { NodotsGame } from '../../../stores/Game'
import { Color } from '../../../stores/Game/types'

interface Props {
  store: NodotsGame
  color: Color
}

const isActive = (activeColor: Color, color: Color) => activeColor === color

function RollSurface({ store, color }: Props) {
  console.log(color, store)
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
