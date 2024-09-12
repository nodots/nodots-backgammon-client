import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useNodotsPlayer } from '../../../../../Contexts/Player/useNodotsPlayer'
import {
  NodotsGame,
  NodotsPlayer,
} from '../../../../../../nodots_modules/backgammon-types'
// import { useNodotsGame } from '../../../../../Contexts/Game/useNodotsGame'
import { apiUrl } from '../../../../../App'
import { GameActionTypes } from '../../../../../Contexts/Game/GameContextActions'

const startGame = (
  playerId: string,
  opponentId: string
): Promise<NodotsGame> => {
  return fetch(`${apiUrl}/game`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      player1Id: playerId,
      player2Id: opponentId,
    }),
  }).then((res) => {
    console.log('[PlayerAction] startGame res: ', res)
    return res.json()
  })
}

interface Props {
  opponent: NodotsPlayer
}

export const PlayerAction = ({ opponent }: Props) => {
  const { t } = useTranslation()
  const { playerState, playerDispatch } = useNodotsPlayer()
  const player = playerState.player

  // const { gameState, gameDispatch } = useNodotsGame()

  const navigate = useNavigate()

  const handleClick = async (e: React.MouseEvent) => {
    console.log('[PlayerAction] handleClick playerState: ', playerState)
    console.log('[PlayerAction] handleClick opponent: ', opponent)
    if (!playerState || !opponent) return
    // const game = await startGame(playerState.player.id, opponent.id)
    // gameDispatch({ type: GameActionTypes.SET_GAME, payload: game })
  }
  switch (player?.kind) {
    case 'player-playing':
      return <></>
    case 'player-ready':
      return <Button onClick={handleClick}>{t('NDBG_START_GAME')}</Button>
  }
}
