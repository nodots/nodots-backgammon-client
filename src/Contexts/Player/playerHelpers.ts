import {
  NodotsPlayer,
  PlayerInitializing,
  PlayerReady,
} from '../../../nodots_modules/backgammon-types'
import { apiUrl } from '../../App'

export const getPlayers = async (): Promise<NodotsPlayer[]> => {
  const result = await fetch(`${apiUrl}/player`)
  return result.json()
}

export const getPlayerById = async (id: string): Promise<NodotsPlayer> => {
  const result = await fetch(`${apiUrl}/player/${id}`)
  return result.json()
}

export const getPlayerBySub = async (sub: string): Promise<NodotsPlayer> => {
  const [source, externalId] = sub.split('|')
  const endpoint = `${apiUrl}/player/sub/${source}/${externalId}`
  const result = await fetch(endpoint)
  const player = await result.json()
  return player
}

export const addPlayer = async (
  player: PlayerInitializing
): Promise<PlayerReady> => {
  const result = await fetch(`${apiUrl}/player`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(player),
  })
  return result.json()
}

// export const setPlayerSeekingGame = async (
//   id: string,
//   seekingGame: boolean
// ): Promise<NodotsPlayer> => {
//   fetch(`${apiUrl}/auth`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(user),
//   }).then(async (response) => {
//     const player = await response.json()
//     response.ok && initializePlayer(player)
//   })
//   const result = await fetch(`${apiUrl}/player/seeking-game/${id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ seekingGame }),
//   })
//   console.log('[PlayerContextHelper] setPlayerSeekingGame result:', result)
//   return result.json()
// }
