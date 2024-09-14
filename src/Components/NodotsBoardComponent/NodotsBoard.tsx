import { Paper } from '@mui/material'
import { QuadrantPoints } from '.'
import {
  NodotsColor,
  NodotsGame,
  NodotsPlayer,
} from '../../../nodots_modules/backgammon-types'
import { useNodotsGame } from '../../Contexts/Game/useNodotsGame'
import { Loading } from '../Loading'
import NodotsBarComponent from './NodotsBarComponent'
import NodotsOffComponent from './NodotsOffComponent'
import NodotsQuadrantComponent from './NodotsQuadrantComponent'
import NodotsRollSurfaceComponent from './NodotsRollSurfaceComponent'
import NodotsBoardHalf from './NodotsBoardHalf'

interface Props {
  game: NodotsGame
  player: NodotsPlayer
}
export const NodotsBoard = ({ game, player }: Props) => {
  const { gameDispatch } = useNodotsGame()

  console.log('[NodotsBoard] game:', game)
  return (
    <Paper
      elevation={3}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <NodotsBoardHalf game={game} longitude="west" />
    </Paper>
  )
}
