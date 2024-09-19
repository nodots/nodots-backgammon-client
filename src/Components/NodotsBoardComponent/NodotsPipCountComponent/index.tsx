import { Chip, SxProps, useTheme } from '@mui/material'
// import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'
import {
  NodotsColor,
  NodotsGame,
  Player,
  PlayerPlaying,
  PlayerReady,
} from '../../../../nodots_modules/backgammon-types'

interface Props {
  game: NodotsGame
  player: PlayerPlaying | PlayerReady
}

function NodotsPipCountComponent({ game, player }: Props) {
  const color = player.color
  const theme = useTheme()
  const getBackgroundColor = (color: NodotsColor): SxProps =>
    color === 'black'
      ? { backgroundColor: theme.palette.secondary.dark }
      : { backgroundColor: theme.palette.secondary.light }

  return (
    <Chip className={`pip-count`} label={167} sx={getBackgroundColor(color)} />
  )
}

export default NodotsPipCountComponent
