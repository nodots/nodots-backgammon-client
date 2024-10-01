import {
  NodotsGame,
  NodotsGameActive,
  NodotsGameReady,
  NodotsPlayersReady,
} from '../../../nodots_modules/backgammon-types'
import { apiUrl } from '../../App'

export const startGame = async (players: NodotsPlayersReady) => {
  const startGamePayload: [string, string] = [
    players.white.id,
    players.black.id,
  ]
  const gameReady = (await fetch(`${apiUrl}/game`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(startGamePayload),
  })) as unknown as NodotsGameReady
  sessionStorage.setItem('gameId', gameReady.id)
  return gameReady
}

export const getGames = async (): Promise<NodotsGameActive[]> => {
  const result = await fetch(`${apiUrl}/game`)
  return result.json()
}

export const getGameById = async (id: string): Promise<NodotsGame> => {
  const result = await fetch(`${apiUrl}/game/${id}`)
  return result.json()
}

export const getActiveGameById = async (
  id: string
): Promise<NodotsGameActive | null> => {
  const result = await fetch(`${apiUrl}/game/${id}`)
  const game = await result.json()
  switch (game.kind) {
    case 'initializing':
      return null
    case 'ready':
    case 'playing':
      return game
  }
  return null
}

export const getActiveGameByPlayerId = async (
  id: string
): Promise<NodotsGameActive | null> => {
  console.log('[gameHelpers] getActiveGameByPlayerId id:', id)
  const result = await fetch(`${apiUrl}/game/player/${id}`)
  const game = await result.json()
  console.log('[gameHelpers] getActiveGameByPlayerId game:', game)
  return game
}
