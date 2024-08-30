import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NodotsPlayer } from '../../../../nodots_modules/backgammon-types'
import useNodotsGame from '../../../Hooks/GameHook'
import PlayerRow from './PlayerRow'

const Friends = () => {
  const { getPlayers } = useNodotsGame()
  const [players, setPlayers] = useState<NodotsPlayer[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    getPlayers().then((players: NodotsPlayer[]) => {
      setPlayers(players)
    })
  }, [])

  return (
    <Card
      sx={{ width: '20vw', minWidth: '320px', padding: '.5vh .5vw' }}
      variant="outlined"
    >
      <CardHeader title={t('NDBG_FRIENDS')} />
      <CardContent>
        <Table>
          <TableBody>
            <PlayerRow player={players[0]} />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
export default Friends
