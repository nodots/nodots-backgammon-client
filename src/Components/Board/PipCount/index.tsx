import { Chip, SxProps, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import { Color } from '../../../GameStore/types'
import { NodotsPlayer } from '../../../GameStore/types/Player'

interface Props {
  player: NodotsPlayer
}

function PipCount({ player }: Props) {
  const theme = useTheme()
  const getStyles = (color: Color): SxProps =>
    color === 'black'
      ? { backgroundColor: theme.palette.secondary.dark }
      : { backgroundColor: theme.palette.secondary.light }

  return (
    <Chip
      className={`pip-count`}
      label={player.pipCount}
      sx={getStyles(player.color)}
    />
  )
}

export default observer(PipCount)
