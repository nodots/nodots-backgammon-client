import { observer } from 'mobx-react'
import { NodotsPlayer } from '../../GameStore/types/Player'
import { Card, Chip, useTheme } from '@mui/material'
import { Color } from '../../GameStore/types'

interface Props {
  player: NodotsPlayer
}

function Notification({ player }: Props) {
  const theme = useTheme()
  const getBackgroundColor = (color: Color) => {
    return color === 'white'
      ? theme.palette.secondary.light.toString()
      : theme.palette.secondary.dark.toString()
  }
  const backgroundColor = getBackgroundColor(player.color)
  return (
    <Card
      className={`player-pips ${player.color}`}
      sx={{ backgroundColor: backgroundColor }}
    >
      {player.pipCount}
    </Card>
  )
}

export default observer(Notification)
