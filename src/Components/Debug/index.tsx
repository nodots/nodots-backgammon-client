import { useGame } from '../../game/useGame'
import {
  Card, CardHeader, CardContent, Box,
  Table, TableBody, TableCell, TableRow
} from '@mui/material'
import { Move, MoveStatus, MoveMode } from '../CheckerBox/state'
import { TurnStatus } from '../../game/turn'

export interface DebugProps {
  elevation?: number
}

export const Debug = (props: DebugProps) => {
  const { game } = useGame()
  const activeColor = game.activeColor
  const activeTurn = game.activeTurn
  const roll = activeTurn?.roll
  const moves = activeTurn?.moves

  if (moves && game.activeTurn) {
    const activeMoveIndex = moves.findIndex((m: Move) => m.status !== MoveStatus.COMPLETED)
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
    return <div className='info-column'>

      <Card className='info' elevation={props.elevation ? props.elevation : 0}>
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
          {moveTable(activeMove, 'Active')}
          {previousMove ? moveTable(previousMove, 'Previous') : <></>}
          {nextMove ? moveTable(nextMove, 'Next') : <></>}
        </CardContent >
      </Card >
    </div>
  } else {
    return <Box>No Active Turn</Box>
  }

}

function moveTable (activeMove: Move, label: string) {
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
        <TableCell>Mode</TableCell>
        <TableCell>{activeMove?.mode ? MoveMode[activeMove.mode] : 'N/A'}</TableCell>
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

