import {
  NodotsGameRollingForStart,
  NodotsGame,
} from '../../../nodots_modules/backgammon-types'
import { apiUrl } from '../../App'

export const getGameById = async (id: string): Promise<NodotsGame> => {
  console.log('[GameContextHelper] getGameById: ', id)
  const result = await fetch(`${apiUrl}/game/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const game: NodotsGame = await result.json()
  console.log('[GameContextHelper] game: ', game)
  return game
}

export type StartGamePayload = [string, string]

export const startGame = async (
  payload: StartGamePayload
): Promise<NodotsGameRollingForStart> => {
  const player1Playing = await fetch(`${apiUrl}/player/playing/${payload[0]}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const player2Playing = await fetch(`${apiUrl}/player/playing/${payload[1]}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const gameResult = await fetch(`${apiUrl}/game`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const gameRollingForStart = await gameResult.json()
  console.log(
    '[GameContextHelpers] startGame results player1Playing: ',
    player1Playing
  )
  console.log(
    '[GameContextHelpers] startGame results player2Playing: ',
    player2Playing
  )
  console.log(
    '[GameContextHelpers] startGame results player1Playing: ',
    gameRollingForStart
  )
  return gameRollingForStart
}
