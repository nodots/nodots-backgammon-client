import { Chip, SxProps, useTheme } from '@mui/material'
// import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'
import {
  NodotsColor,
  NodotsGame,
  NodotsMoveDirection,
  NodotsPlayer,
  NodotsPlayerPlaying,
  NodotsPlayerReady,
} from '../../../../nodots_modules/backgammon-types'
import { useGameContext } from '../../../Contexts/Game/useGameContext'

interface Props {
  direction: NodotsMoveDirection
}

function NodotsPipCountComponent({ direction }: Props) {
  const { gameState, gameDispatch } = useGameContext()
  const { game } = gameState
  const theme = useTheme()
  const color =
    game.players.white.attributes.direction === 'counterclockwise'
      ? 'white'
      : 'black'
  const getBackgroundColor = (color: NodotsColor): SxProps =>
    color === 'black'
      ? { backgroundColor: theme.palette.secondary.dark }
      : { backgroundColor: theme.palette.secondary.light }

  return (
    <Chip className={`pip-count`} label={167} sx={getBackgroundColor(color)} />
  )
}

export default NodotsPipCountComponent
