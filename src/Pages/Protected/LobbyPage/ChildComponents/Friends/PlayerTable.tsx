import { Table, TableBody } from '@mui/material'
import PlayerRow from './PlayerRow'
import { useEffect, useState } from 'react'
// import { useNodotsGame } from '../../../../../Contexts/Game/useNodotsGame'
import { Loading } from '../../../../../Components/Loading'
import { getPlayers } from '../../../../../Contexts/Player/playerHelpers'
import {
  NodotsPlayerActive,
  NodotsPlayerInitializing,
} from '../../../../../../nodots_modules/backgammon-types'
import { usePlayerContext } from '../../../../../Contexts/Player/usePlayerContext'

const PlayerTable = () => {
  const { state, dispatch } = usePlayerContext()
  const [opponents, setOpponents] = useState<NodotsPlayerActive[]>([])
  useEffect(() => {
    getPlayers().then((players) => {
      setOpponents(players)
    })
  }, [])
  return opponents?.length > 0 ? (
    <Table>
      <TableBody>
        {opponents.map((opponent) => {
          switch (opponent.kind) {
            case 'ready':
              return (
                state.player.id != opponent.id && (
                  <PlayerRow key={opponent.id} opponent={opponent} />
                )
              )
            case 'playing':
              return <></>
          }
        })}
      </TableBody>
    </Table>
  ) : (
    <Loading message="PlayerTable Loading" />
  )
}

export default PlayerTable
