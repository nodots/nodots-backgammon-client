import { observer } from 'mobx-react'
import { Player } from '../../GameStore/types/Player'
import { Card, Chip, useTheme } from '@mui/material'
import { Color } from '../../GameStore/types'

interface Props {
  player: Player
}

function Notification({ player }: Props) {
  const theme = useTheme()
  const backgroundColor = (color: Color) => {
    return color === 'white'
      ? theme.palette.secondary.light
      : theme.palette.secondary.dark
  }
  return (
    <Card className={`player-pips ${player.color}`} sx={{ backgroundColor }}>
      {player.pipCount}
    </Card>
  )
}

export default observer(Notification)
