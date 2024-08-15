import { Container } from '@mui/material'

import NodotsDieComponent from '../NodotsDieComponent'
import DiceSwitcher from './NodotsDiceSwitcherComponent'
import { NodotsColor } from '../../../../nodots_modules/backgammon-types'

interface Props {
  color: NodotsColor
}

function NodotsRollSurfaceComponent({ color }: Props) {
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
        <NodotsDieComponent order={0} color={color} />
        <DiceSwitcher color={color} />
        <NodotsDieComponent order={1} color={color} />
      </div>
    </Container>
  )
}

export default NodotsRollSurfaceComponent
