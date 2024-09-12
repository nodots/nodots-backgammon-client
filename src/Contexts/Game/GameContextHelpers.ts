import {
  GameRollingForStart,
  NodotsGame,
} from '../../../nodots_modules/backgammon-types'
import { apiUrl } from '../../App'

export const getGameById = async (id: string): Promise<NodotsGame> => {
  const result = await fetch(`${apiUrl}/game/${id}`)
  return result.json()
}

export interface StartGamePayload {
  playerIds: [player1Id: string, player2Id: string]
}

export const startGame = (
  payload: StartGamePayload
): Promise<GameRollingForStart> => {
  return fetch(`${apiUrl}/game`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((res) => {
    console.log('[GameContextHelper] startGame res: ', res)
    return res.json()
  })
}
