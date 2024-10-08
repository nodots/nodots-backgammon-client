import { UserInfoResponse as Auth0User } from 'auth0'
import {
  NodotsLocale,
  NodotsPlayer,
  NodotsPlayerInitializing,
  NodotsPlayerPlaying,
  NodotsPlayerReady,
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

export const getPlayers = async (): Promise<NodotsPlayer[]> => {
  const result = await fetch(`${apiUrl}/player`)
  return result.json()
}

export const getReadyPlayers = async (): Promise<NodotsPlayerReady[]> => {
  const result = await fetch(`${apiUrl}/player/ready`)
  return result.json()
}

export const getPlayerById = async (
  id: string
): Promise<
  NodotsPlayersInitializing | NodotsPlayerReady | NodotsPlayerPlaying
> => {
  const result = await fetch(`${apiUrl}/player/${id}`)
  return result.json()
}

export const getReadyPlayerById = async (
  id: string
): Promise<NodotsPlayerReady | null> => {
  const result = await fetch(`${apiUrl}/player/${id}`)
  const player = await result.json()
  switch (player.kind) {
    case 'initializing':
      return null
    case 'ready':
      return player
    case 'playing':
      return null
  }
  return null
}

export const getPlayingPlayerById = async (
  id: string
): Promise<NodotsPlayerPlaying | null> => {
  const result = await fetch(`${apiUrl}/player/${id}`)
  const player = await result.json()
  switch (player.kind) {
    case 'initializing':
      return null
    case 'ready':
      return null
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
  sessionStorage.setItem('playerId', player.id as string)
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

export const logoutPlayer = async (player: NodotsPlayer) => {
  console.log('[playerHelpers] logoutPlayer player:', player)
  const result = await fetch(`${apiUrl}/player/logout/${player.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log('[playerHelpers] signoutPlayer result:', result)
  sessionStorage.removeItem('playerId')
  sessionStorage.removeItem('gameId')
  return result.json()
}

export const loginPlayer = async (player: NodotsPlayer) => {
  console.log('[playerHelpers] logoutPlayer player:', player)
  const result = await fetch(`${apiUrl}/player/login/${player.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log('[playerHelpers] signoutPlayer result:', result)
  sessionStorage.setItem('playerId', player.id as string)
  return result.json()
}
