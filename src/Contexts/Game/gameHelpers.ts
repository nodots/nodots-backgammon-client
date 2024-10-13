import {
  NodotsGame,
  NodotsGameActive,
  NodotsGameReady,
  NodotsGameRollingForStart,
  NodotsPlayersReady,
} from '../../../nodots_modules/backgammon-types'

const apiUrl = 'https://api.localhost'

export const startGame = async (
  players: NodotsPlayersReady
): Promise<NodotsGameRollingForStart> => {
  const startGamePayload: [string, string] = [
    players.white.id,
    players.black.id,
  ]
  const game = (await fetch(`${apiUrl}/game`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(startGamePayload),
  })) as unknown as NodotsGameRollingForStart
  sessionStorage.setItem('gameId', game.id)
  return game
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
    case 'rolling-for-start':
    case 'rolling':
    case 'moving':
      return game
    default:
      console.error('[gameHelpers] getActiveGameById Invalid game kind:', game)
      return null
  }
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
