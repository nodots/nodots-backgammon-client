import { useGame } from '../../game/useGame'
import {
  Card, CardHeader, CardContent,
  Table, TableBody, TableCell, TableHead, TableRow, Tab
} from '@mui/material'
import { Move, MoveStatus } from '../CheckerBox/state'
import { TurnStatus } from '../Player/state/types'

export const Info = () => {
  const { game } = useGame()
  const activeColor = game.activeColor
  const activeTurn = game.activeTurn
  const roll = activeTurn?.roll
  const moves = activeTurn.moves

  const activeMoveIndex = moves.findIndex(m => m.status !== MoveStatus.COMPLETED)
  const activeMove = moves[activeMoveIndex]
  let previousMove: Move | undefined = undefined
  let nextMove: Move | undefined = undefined
  if (activeMoveIndex > 0) {
    previousMove = moves[activeMoveIndex - 1]
  } if (activeMoveIndex < moves.length - 1) {
    nextMove = moves[activeMoveIndex + 1]
  }

  let activePlayer
  if (activeColor) {
    activePlayer = game.players[activeColor]
  }
  return <Card className='info'>
    <CardHeader title='Active Turn'></CardHeader>
    <CardContent>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>{activeTurn.status ? TurnStatus[activeTurn.status] : 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Active Color</TableCell>
            <TableCell>{activeColor ? activeColor.toString().toUpperCase() : 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Active Player</TableCell>
            <TableCell>{activePlayer ? activePlayer.color.toString().toUpperCase() : 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Roll</TableCell>
            <TableCell>{roll ? roll[0] : 'X'}:{roll ? roll[1] : 'X'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <h2>Moves ({moves.length})</h2>
      {newFunction(activeMove, 'Active')}
      {previousMove ? newFunction(previousMove, 'Previous') : <></>}
      {nextMove ? newFunction(nextMove, 'Next') : <></>}
    </CardContent >
  </Card >
}

function newFunction (activeMove: Move, label: string) {
  return <Table>
    <TableBody>
      <TableRow>
        <TableCell colSpan={2}><h3>{label}</h3></TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Status</TableCell>
        <TableCell>{activeMove ? MoveStatus[activeMove.status] : 'N/A'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Origin</TableCell>
        <TableCell>{activeMove?.origin ? activeMove.origin.position : 'N/A'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Destination</TableCell>
        <TableCell>{activeMove?.destination ? activeMove.destination.position : 'N/A'}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
}

