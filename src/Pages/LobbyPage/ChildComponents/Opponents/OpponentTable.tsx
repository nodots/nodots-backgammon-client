import { Table, TableBody } from '@mui/material'
import OpponentRow from './OpponentRow'
import { useEffect, useState } from 'react'
import { Loading } from '../../../../Components/utils/Loading'
import { getPlayers } from '../../../../Contexts/Player/playerHelpers'
import { NodotsPlayerReady } from '../../../../../nodots_modules/backgammon-types'
import { usePlayerContext } from '../../../../Contexts/Player/usePlayerContext'

const OpponentTable = () => {
  const { playerState, playerDispatch } = usePlayerContext()
  const { player } = playerState
  const [opponents, setOpponents] = useState<NodotsPlayerReady[]>([])
  useEffect(() => {
    getPlayers().then((os) => {
      setOpponents(os.filter((p) => p.kind === 'ready'))
    })
  }, [])
  return opponents?.length > 0 ? (
    <Table>
      <TableBody>
        {opponents.map(
          (opponent) =>
            opponent.id !== player.id && (
              <OpponentRow key={opponent.id} opponent={opponent} />
            )
        )}
      </TableBody>
    </Table>
  ) : (
    <Loading message="PlayerTable Loading" />
  )
}

export default OpponentTable
