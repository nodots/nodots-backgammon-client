import { Chip, SxProps, useTheme } from '@mui/material'
import { observer } from 'mobx-react'
import { Color } from '../../../GameStore/types'
import { Player } from '../../../GameStore/types/Player'

interface Props {
  player: Player
}

function NodotsPipCountComponent({ player }: Props) {
  const theme = useTheme()
  const getBackgroundColor = (color: Color): SxProps =>
    color === 'black'
      ? { backgroundColor: theme.palette.secondary.dark }
      : { backgroundColor: theme.palette.secondary.light }

  return (
    <Chip
      className={`pip-count ${getBackgroundColor(player.color)}`}
      label={player.pipCount}
    />
  )
}

export default observer(NodotsPipCountComponent)
