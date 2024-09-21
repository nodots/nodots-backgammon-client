import { UserInfoResponse as Auth0User } from 'auth0'
import {
  NodotsPlayerActive,
  NodotsPlayerInitializing,
  NodotsPlayerReady,
  NodotsPlayersActive,
  NodotsPlayersInitializing,
} from '../../../nodots_modules/backgammon-types'
import { apiUrl } from '../../App'
import { PlayerActions, PlayerActionTypes } from './playerActions'

export const getPlayers = async (): Promise<NodotsPlayerActive[]> => {
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

export const getPlayerBySub = async (sub: string) => {
  console.log('[playerHelpers] getPlayerBySub sub:', sub)
  const [source, externalId] = sub.split('|')
  const endpoint = `${apiUrl}/player/sub/${source}/${externalId}`
  const result = await fetch(endpoint)
  if (result.status === 404) {
    return null
  }
  return result.json()
}

export const togglePlayerSeekingGame = async (
  player: NodotsPlayerReady
): Promise<NodotsPlayerReady> => {
  console.log(
    '[playerHelpers] togglePlayerSeekingGame player:',
    player.isSeekingGame
  )
  const result = await fetch(`${apiUrl}/player/seeking-game/${player.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const updatedPlayer = (await result.json()) as NodotsPlayerReady
  return updatedPlayer
}

export const createPlayerFromAuth0User = async (
  user: Auth0User
): Promise<NodotsPlayerActive> => {
  console.log('[playerHelpers] createPlayerFromAuth0User user:', user)
  const result = await fetch(`${apiUrl}/player`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  const playerReady = (await result.json()) as NodotsPlayerReady
  console.log(
    '[playerHelpers] createPlayerFromAuth0User playerReady:',
    playerReady
  )
  return playerReady
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
