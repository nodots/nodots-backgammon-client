import { TableRow, TableCell, Avatar, Button } from '@mui/material'
import { NodotsPlayerActive } from '../../../../../nodots_modules/backgammon-types'
import PlayerStatus from './PlayerStatus'
import { PlayerAction } from './PlayerAction'
import { usePlayerContext } from '../../../../Contexts/Player/usePlayerContext'

interface Props {
  opponent: NodotsPlayerActive
}

const PlayerRow = ({ opponent }: Props) => {
  const { state, dispatch } = usePlayerContext()
  // const startGame = async (playerId: string, opponentId: string) => {
  //   const response = await fetch(`${apiUrl}/game`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify([playerId, opponentId]),
  //   }).catch((e) => console.error(e))
  //   !response
  //     ? console.error('Failed to start game')
  //     : response.ok
  //     ? response.json().then((game) => {
  //         gameDispatch({ type: GameActionTypes.SET_GAME, payload: game })
  //       })
  //     : console.error('Failed to start game')
  // }
  return (
    <TableRow>
      <TableCell>
        <Avatar
          src={opponent.preferences?.avatar}
          alt={opponent.preferences?.username}
        />
      </TableCell>
      <TableCell>
        <PlayerStatus player={opponent} />
      </TableCell>
      <TableCell>
        <PlayerAction opponent={opponent} />
      </TableCell>
    </TableRow>
  )
}

export default PlayerRow
