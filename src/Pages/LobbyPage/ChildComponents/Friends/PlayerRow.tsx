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
  return (
    <TableRow>
      <TableCell>
        <Avatar
          src={opponent.preferences?.avatar}
          alt={opponent.preferences?.username}
        />
      </TableCell>
      <TableCell>
        <PlayerStatus opponent={opponent} />
      </TableCell>
      <TableCell>
        <PlayerAction opponent={opponent} />
      </TableCell>
    </TableRow>
  )
}

export default PlayerRow
