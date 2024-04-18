import { Chip, SxProps, useTheme } from '@mui/material'
import { Player } from '../../../GameStore/types/Player'
import { Color } from '../../../GameStore/types'
import { observer } from 'mobx-react'
interface Props {
  player: Player
}

function PipCount({ player }: Props) {
  const theme = useTheme()
  const getStyles = (color: Color): SxProps =>
    color === 'black'
      ? { backgroundColor: theme.palette.secondary.dark }
      : { backgroundColor: theme.palette.secondary.light }

  return (
    <Chip className={`pip-count`} label={167} sx={getStyles(player.color)} />
  )
}

export default observer(PipCount)
