import { TableRow, TableCell, Avatar, Button } from '@mui/material'
import {
  NodotsPlayer,
  PlayerReady,
} from '../../../../../../nodots_modules/backgammon-types'
import PlayerStatus from './PlayerStatus'
import { PlayerAction } from './PlayerAction'
import { apiUrl } from '../../../../../App'
import { GameActionTypes } from '../../../../../Contexts/Game/GameContextActions'
import { useNodotsGame } from '../../../../../Contexts/Game/useNodotsGame'

interface Props {
  player: PlayerReady
  onInvite?: (player: NodotsPlayer) => void
  onChallenge?: (player: NodotsPlayer) => void
}

const PlayerRow = ({ player }: Props) => {
  const { gameDispatch } = useNodotsGame()
  const startGame = async (playerId: string, opponentId: string) => {
    const response = await fetch(`${apiUrl}/game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([playerId, opponentId]),
    }).catch((e) => console.error(e))
    !response
      ? console.error('Failed to start game')
      : response.ok
      ? response.json().then((game) => {
          gameDispatch({ type: GameActionTypes.SET_GAME, payload: game })
          sessionStorage.setItem('gameId', game.id)
        })
      : console.error('Failed to start game')
  }
  return (
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
        <PlayerAction startGame={startGame} opponent={player} player={player} />
      </TableCell>
    </TableRow>
  )
}

export default PlayerRow
