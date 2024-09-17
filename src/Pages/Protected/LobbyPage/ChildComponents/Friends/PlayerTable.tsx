import { Table, TableBody } from '@mui/material'
import PlayerRow from './PlayerRow'
import {
  NodotsPlayer,
  PlayerReady,
} from '../../../../../../nodots_modules/backgammon-types'
import { useState, useEffect } from 'react'
// import { useNodotsGame } from '../../../../../Contexts/Game/useNodotsGame'
import { Loading } from '../../../../../Components/Loading'
import { useNodotsPlayer } from '../../../../../Contexts/Player/useNodotsPlayer'
import { getPlayers } from '../../../../../Contexts/Player/playerHelpers'

interface Props {
  player: NodotsPlayer
}

const PlayerTable = ({ player }: Props) => {
  const [opponents, setOpponents] = useState<NodotsPlayer[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      opponents.length === 0 &&
        getPlayers()?.then((opponents: NodotsPlayer[]) => {
          opponents && opponents.length > 0 ? setOpponents(opponents) : null
        })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return opponents?.length > 0 ? (
    <Table>
      <TableBody>
        {opponents.map((opponent) => {
          switch (opponent.kind) {
            case 'player-ready':
              return (
                player.id != opponent.id && (
                  <PlayerRow key={opponent.id} player={opponent} />
                )
              )
            case 'player-playing':
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