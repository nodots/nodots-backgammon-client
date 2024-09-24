import { UserInfoResponse as Auth0User } from 'auth0'
import {
  NodotsLocale,
  NodotsPlayer,
  NodotsPlayerActive,
  NodotsPlayerInitializing,
  NodotsPlayerReady,
  NodotsPlayersActive,
  NodotsPlayersInitializing,
} from '../../../nodots_modules/backgammon-types'
import { apiUrl } from '../../App'
import { PlayerActions, PlayerActionTypes } from './playerActions'

export const createPlayer = async (
  user: Auth0User,
  dispatch: React.Dispatch<PlayerActions>
) => {
  const [source, externalId] = user.sub.split('|')
  const playerInitializing: NodotsPlayerInitializing = {
    ...user,
    kind: 'initializing',
    source,
    externalId,
    isLoggedIn: false,
    preferences: {
      username: user.preferred_username || user.nickname || user.given_name,
      givenName: user.given_name,
      familyName: user.family_name,
      locale: user.locale as NodotsLocale,
      avatar: user.picture,
    },
  }

  const playerReady = (await fetch(`${apiUrl}/player`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...playerInitializing, isLoggedIn: true }),
  })) as unknown as NodotsPlayerReady

  console.log('[playerHelpers] createPlayer loggedInPlayer:', playerReady)
  dispatch({ type: PlayerActionTypes.SET_PLAYER, payload: playerReady })
  return playerReady
}

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

export const getActivePlayerById = async (
  id: string
): Promise<NodotsPlayerActive | null> => {
  const result = await fetch(`${apiUrl}/player/${id}`)
  const player = await result.json()
  switch (player.kind) {
    case 'initializing':
      return null
    case 'ready':
    case 'playing':
      return player
  }
  return null
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

export const setPlayer = async (
  player: NodotsPlayer,
  dispatch: React.Dispatch<PlayerActions>
) => {
  dispatch({
    type: PlayerActionTypes.SET_PLAYER,
    payload: player,
  })
  return player
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

export const logoutPlayer = async (player: NodotsPlayerActive) => {
  console.log('[playerHelpers] logoutPlayer player:', player)
  const result = await fetch(`${apiUrl}/player/logout/${player.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log('[playerHelpers] signoutPlayer result:', result)
  return result.json()
}

export const loginPlayer = async (player: NodotsPlayerActive) => {
  console.log('[playerHelpers] logoutPlayer player:', player)
  const result = await fetch(`${apiUrl}/player/login/${player.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log('[playerHelpers] signoutPlayer result:', result)
  return result.json()
}
