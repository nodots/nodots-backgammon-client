import { TableRow, TableCell, Avatar, Button } from '@mui/material'
import { NodotsPlayerReady } from '../../../../../nodots_modules/backgammon-types'
import OpponentStatus from './OpponentStatus'
import { OpponentAction } from './OpponentAction'
import { usePlayerContext } from '../../../../Contexts/Player/usePlayerContext'

interface Props {
  opponent: NodotsPlayerReady
}

const OpponentRow = ({ opponent }: Props) => {
  return (
    <TableRow>
      <TableCell>
        <Avatar
          src={opponent.preferences?.avatar}
          alt={opponent.preferences?.username}
        />
      </TableCell>
      <TableCell>
        <OpponentStatus opponent={opponent} />
      </TableCell>
      <TableCell>
        <OpponentAction opponent={opponent} />
      </TableCell>
    </TableRow>
  )
}

export default OpponentRow
