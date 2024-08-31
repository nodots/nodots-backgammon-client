import { Table, TableBody } from '@mui/material'
import PlayerRow from './PlayerRow'
import { NodotsPlayer } from '../../../../nodots_modules/backgammon-types'
import { useState, useEffect } from 'react'
import useNodotsGame from '../../../Hooks/GameHook'

const PlayerTable = () => {
  const { getPlayers } = useNodotsGame()
  const [players, setPlayers] = useState<NodotsPlayer[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      getPlayers().then((players: NodotsPlayer[]) => {
        setPlayers(players)
      })
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return players?.length > 0 ? (
    <Table>
      <TableBody>
        {players.map((player) => (
          <PlayerRow key={player.id} player={player} />
        ))}
      </TableBody>
    </Table>
  ) : (
    <div>Loading...</div>
  )
}

export default PlayerTable
