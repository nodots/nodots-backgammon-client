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
  const { game } = useGameContext()

  const getColor = () => {
    console.log('[RollSurfaceComponent] getColor game.players:', game?.kind)
    if (longitude === 'west') {
      return game?.players[0].direction === 'counterclockwise'
        ? 'white'
        : 'black'
    } else {
      return game?.players[1].direction === 'clockwise' ? 'white' : 'black'
    }
  }

  switch (game?.kind) {
    case 'initializing':
      return <Loading message="RollSurfaceComponent loading game" />
    case 'rolling-for-start':
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
            <NodotsDieComponent order={0} color="white" />
          </div>
        </Container>
      )
    case 'rolling':
    case 'moving':
    case 'ready':
      return <div style={{ color: 'red' }}>{game.kind}</div>
  }
}

export default NodotsRollSurfaceComponent
