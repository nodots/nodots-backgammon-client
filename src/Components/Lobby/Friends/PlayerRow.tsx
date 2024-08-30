import { TableRow, TableCell, Avatar, Button } from '@mui/material'
import { NodotsPlayer } from '../../../../nodots_modules/backgammon-types'

interface Props {
  player: NodotsPlayer
  avatar?: string
  onInvite?: (player: NodotsPlayer) => void
  onChallenge?: (player: NodotsPlayer) => void
}
const PlayerRow = ({ player, avatar }: Props) => {
  return (
    <TableRow>
      <TableCell>
        <Avatar />
      </TableCell>
      <TableCell>Online</TableCell>
      <TableCell>
        <Button>Play</Button>
      </TableCell>
    </TableRow>
  )
}

export default PlayerRow
