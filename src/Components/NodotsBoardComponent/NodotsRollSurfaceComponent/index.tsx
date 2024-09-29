import { Container } from '@mui/material'

import NodotsDieComponent from '../NodotsDieComponent'
import DiceSwitcher from './NodotsDiceSwitcherComponent'
import {
  Longitude,
  NodotsColor,
  NodotsGame,
  NodotsPlayer,
} from '../../../../nodots_modules/backgammon-types'
import { useGameContext } from '../../../Contexts/Game/useGameContext'
import { usePlayerContext } from '../../../Contexts/Player/usePlayerContext'
import { Loading } from '../../utils/Loading'

interface Props {
  longitude: Longitude
}

function NodotsRollSurfaceComponent({ longitude }: Props) {
  const { gameState, gameDispatch } = useGameContext()
  const { game } = gameState
  const { playerState, playerDispatch } = usePlayerContext()
  const { player } = playerState

  const getColor = () => {
    if (longitude === 'west') {
      return game.players.white.attributes.direction === 'counterclockwise'
        ? 'white'
        : 'black'
    } else {
      return game.players.white.attributes.direction === 'clockwise'
        ? 'white'
        : 'black'
    }
  }

  const color = getColor()

  return game.kind !== 'initializing' && player.kind !== 'initializing' ? (
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
        {/* <DiceSwitcher color="white" /> */}
        <NodotsDieComponent order={1} color={color} />
      </div>
    </Container>
  ) : (
    <Loading message="Waiting for Game and Player" />
  )
}

export default NodotsRollSurfaceComponent
