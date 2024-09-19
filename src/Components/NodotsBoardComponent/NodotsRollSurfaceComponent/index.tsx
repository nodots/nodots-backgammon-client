import { Container } from '@mui/material'

import NodotsDieComponent from '../NodotsDieComponent'
import DiceSwitcher from './NodotsDiceSwitcherComponent'
import {
  Longitude,
  NodotsColor,
  NodotsGame,
  Player,
} from '../../../../nodots_modules/backgammon-types'

interface Props {
  game: NodotsGame
  player: Player
  longitude: Longitude
}

function NodotsRollSurfaceComponent({ game, player, longitude }: Props) {
  console.log('[NodotsRollSurfaceComponent] game:', game)

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
        <NodotsDieComponent game={game} order={0} color={player.color} />
        {/* <DiceSwitcher color="white" /> */}
        <NodotsDieComponent game={game} order={1} color={player.color} />
      </div>
    </Container>
  )
}

export default NodotsRollSurfaceComponent
