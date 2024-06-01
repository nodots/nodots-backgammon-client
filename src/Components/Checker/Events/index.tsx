import { observer } from 'mobx-react'
import { Moving, ConfirmingPlay } from '../../../GameStore/types'
import { NodotsMove, NodotsMoves } from '../../../GameStore/types/move'
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { Checkercontainer } from '../../../GameStore/types/Checkercontainer'
import { Player } from '../../../GameStore/types/Player'
import { Point } from '../../../GameStore/types/Checkercontainer'
import { getLastMove } from '../../../GameStore/types/move/helpers'

interface Props {
  state: Moving | ConfirmingPlay
}

function CheckerEventsNotification({ state }: Props) {
  const { activeColor, players, kind } = state
  console.log('[CheckerEvents]:', state.kind)
  const activePlayer = players[activeColor]
  const buildMessage = () => {
    console.log(kind)
    switch (kind) {
      case 'game-confirming-play':
      case 'game-moving':
        console.log(state.id)
    }
    return activeColor
  }
  return <Card>{buildMessage()}</Card>
}

export default observer(CheckerEventsNotification)
