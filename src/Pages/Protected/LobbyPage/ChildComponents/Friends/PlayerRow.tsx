import { TableRow, TableCell, Avatar, Button } from '@mui/material'
import {
  NodotsPlayer,
  PlayerReady,
} from '../../../../../../nodots_modules/backgammon-types'
import PlayerStatus from './PlayerStatus'
import { PlayerAction } from './PlayerAction'

interface Props {
  player: PlayerReady
  onInvite?: (player: NodotsPlayer) => void
  onChallenge?: (player: NodotsPlayer) => void
}
const PlayerRow = ({ player }: Props) => (
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
      <PlayerAction opponent={player} />
    </TableCell>
  </TableRow>
)

export default PlayerRow
