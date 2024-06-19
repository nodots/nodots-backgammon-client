import { Container } from '@mui/material'
import Die from '../Dice'
import DiceSwitcher from '../DiceSwitcher'
import { NodotsColor } from '../../../stores/Game/Types'
import { NodotsGameStore } from '../../../stores/Game/Store'

interface Props {
  gameStore: NodotsGameStore
  color: NodotsColor
}

const isActive = (activeColor: NodotsColor, color: NodotsColor) =>
  activeColor === color

function RollSurface({ gameStore, color }: Props) {
  console.log('[Component: Rollsurface] gameStore:', gameStore)
  console.log('[Component: Rollsurface] color:', color)
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
        <Die order={0} color={color} gameStore={gameStore} />
        <DiceSwitcher gameStore={gameStore} color={color} />
        <Die order={1} color={color} gameStore={gameStore} />
      </div>
    </Container>
  )
}

export default RollSurface
