import { Table, TableBody } from '@mui/material'
import OpponentRow from './OpponentRow'
import { useEffect, useState } from 'react'
import { NodotsPlayerReady } from '../../../../../nodots_modules/backgammon-types'
import { getPlayers } from '../../../../Contexts/Game/playerHelpers'
import { useGameContext } from '../../../../Contexts/Game/GameContext'

const OpponentTable = () => {
  const { player } = useGameContext()
  const [opponents, setOpponents] = useState<NodotsPlayerReady[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      getPlayers().then((os) => {
        // console.log('[OpponentTable] getPlayers os:', os)
        setOpponents(os.filter((p) => p.kind === 'ready'))
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  // console.log('[OpponentTable] opponents:', opponents)
  return (
    <Table>
      <TableBody>
        {player &&
          opponents.map(
            (opponent) =>
              opponent.id !== player.id && (
                <OpponentRow key={opponent.id} opponent={opponent} />
              )
          )}
      </TableBody>
    </Table>
  )
}

export default OpponentTable
