import { TableRow, TableCell, Avatar, Button } from '@mui/material'
import { NodotsPlayer } from '../../../../nodots_modules/backgammon-types'
import PlayerStatus from './PlayerStatus'

interface Props {
  player: NodotsPlayer
  onInvite?: (player: NodotsPlayer) => void
  onChallenge?: (player: NodotsPlayer) => void
}
const PlayerRow = ({ player }: Props) => {
  const loggedInPlayerId = sessionStorage.getItem('playerId')
  return player.id === loggedInPlayerId ? (
    <></>
  ) : (
    <TableRow>
      <TableCell>
        <Avatar
          src={player.preferences?.avatar}
          alt={player.preferences?.username}
        />
      </TableCell>
      <TableCell>
        <PlayerStatus player={player} />
      </TableCell>
      <TableCell>
        <Button>
          {player.isLoggedIn && player.kind === 'player-seeking-game'
            ? 'Play'
            : ''}
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default PlayerRow
