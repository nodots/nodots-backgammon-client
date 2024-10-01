import { Chip, SxProps, useTheme } from '@mui/material'
// import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'
import {
  NodotsColor,
  NodotsGame,
  NodotsMoveDirection,
  NodotsPlayer,
  NodotsPlayerPlaying,
  NodotsPlayerReady,
  NodotsPlayersPlaying,
  NodotsPlayersReady,
} from '../../../../nodots_modules/backgammon-types'
import { useGameContext } from '../../../Contexts/Game/useGameContext'

interface Props {
  direction: NodotsMoveDirection
}

const setColor = (
  direction: NodotsMoveDirection,
  players: NodotsPlayersPlaying | NodotsPlayersReady
) => {
  const player1 = players.black
  const player2 = players.white
}

function NodotsPipCountComponent({ direction }: Props) {
  const { game } = useGameContext()
  const theme = useTheme()

  const getBackgroundColor = (color: NodotsColor): SxProps =>
    color === 'black'
      ? { backgroundColor: theme.palette.secondary.dark }
      : { backgroundColor: theme.palette.secondary.light }

  return (
    <Chip
      className={`pip-count`}
      label={999}
      sx={getBackgroundColor('black')}
    />
  )
}

export default NodotsPipCountComponent
