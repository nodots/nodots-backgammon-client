import { Container } from '@mui/material'

import NodotsDieComponent from '../NodotsDieComponent'
import DiceSwitcher from './NodotsDiceSwitcherComponent'
import {
  Longitude,
  NodotsColor,
  NodotsGame,
} from '../../../../nodots_modules/backgammon-types'

interface Props {
  game: NodotsGame
  longitude: Longitude
}

function NodotsRollSurfaceComponent({ game, longitude }: Props) {
  const color =
    longitude === 'east' && game.players.white.direction === 'clockwise'
      ? 'white'
      : 'black'

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
        <NodotsDieComponent game={game} order={0} color={color} />
        <DiceSwitcher color={color} />
        <NodotsDieComponent game={game} order={1} color={color} />
      </div>
    </Container>
  )
}

export default NodotsRollSurfaceComponent
