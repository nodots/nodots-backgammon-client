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

interface Props {
  state: Moving | ConfirmingPlay
}

const buildMoveRow = (move: NodotsMove, player: Player) => {
  const getCheckercontainerLocation = (checkercontainer: Checkercontainer) => {
    switch (checkercontainer.kind) {
      case 'point':
        const point = checkercontainer as unknown as Point // FIXME
        return point.position[player.direction]
      default:
        return checkercontainer.kind
    }
  }

  return (
    <TableRow>
      <TableCell>{move.dieValue}</TableCell>
      <TableCell>
        {move.from ? getCheckercontainerLocation(move.from) : 'n/a'}
      </TableCell>
      <TableCell>
        {move.to ? getCheckercontainerLocation(move.to) : 'n/a'}
      </TableCell>
    </TableRow>
  )
}

const buildMoveTable = (moves: NodotsMove[], player: Player) => {
  return (
    <Table>
      <TableHead>
        <TableCell>Die Value</TableCell>
        <TableCell>From</TableCell>
        <TableCell>To</TableCell>
      </TableHead>
      <TableBody>{moves.map((move) => buildMoveRow(move, player))}</TableBody>
    </Table>
  )
}

function CheckerEvents({ state }: Props) {
  const { activeColor, players, kind } = state
  const activePlayer = players[activeColor]
  const buildMessage = () => {
    switch (kind) {
      case 'game-confirming-play':
      case 'game-moving':
        const { moves } = state
        return buildMoveTable(moves, activePlayer)
    }
    return activeColor
  }
  return <Card>{buildMessage()}</Card>
}

export default observer(CheckerEvents)
