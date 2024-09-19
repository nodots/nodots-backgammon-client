import {
  NodotsPlayerInitializing,
  NodotsPlayerReady,
  NodotsPlayersActive,
  NodotsPlayersInitializing,
} from '../../../nodots_modules/backgammon-types'
import { apiUrl } from '../../App'

export const getPlayers = async (): Promise<
  NodotsPlayersInitializing | NodotsPlayerReady | NodotsPlayersActive
> => {
  const result = await fetch(`${apiUrl}/player`)
  return result.json()
}

export const getPlayerById = async (
  id: string
): Promise<
  NodotsPlayersInitializing | NodotsPlayerReady | NodotsPlayersActive
> => {
  const result = await fetch(`${apiUrl}/player/${id}`)
  return result.json()
}

export const getPlayerBySub = async (
  sub: string
): Promise<
  NodotsPlayersInitializing | NodotsPlayerReady | NodotsPlayersActive
> => {
  console.log('[playerHelpers] getPlayerBySub sub:', sub)
  const [source, externalId] = sub.split('|')
  const endpoint = `${apiUrl}/player/sub/${source}/${externalId}`
  const result = await fetch(endpoint)
  const player = await result.json()
  console.log('[playerHelpers] getPlayerBySub player:', player)
  return player
}

export const togglePlayerSeekingGame = async (
  player: NodotsPlayerReady
): Promise<NodotsPlayerReady> => {
  console.log('[playerHelpers] togglePlayerSeekingGame player:', player)
  const result = await fetch(`${apiUrl}/player/seeking-game/${player.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ seekingGame: player.isSeekingGame }),
  })
  return result.json()
}

export const addPlayer = async (
  player: NodotsPlayerInitializing
): Promise<NodotsPlayerReady> => {
  const result = await fetch(`${apiUrl}/player`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(player),
  })
  return result.json()
}
