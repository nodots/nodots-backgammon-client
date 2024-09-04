import {
  GameInitialized,
  GamePlayingMoving,
  GamePlayingRolling,
  NodotsGame,
  NodotsGameActive,
  NodotsOfferPlay,
  NodotsPlayer,
  PlayerSeekingGame,
} from '../../../nodots_modules/backgammon-types'
import { NodotsLocaleCode } from '../../i18n'
import { apiUrl } from '../../App'

export const getGameById = async (id: string): Promise<NodotsGame> => {
  const result = await fetch(`http://localhost:3000/game/${id}`)
  return result.json()
}
export const _getPlayers = async (
  endpoint: string
): Promise<NodotsPlayer[]> => {
  const result = await fetch(endpoint)
  return result.json()
}
export const _getGameById = async (endpoint: string): Promise<NodotsGame> => {
  const result = await fetch(endpoint)
  return result.json()
}
export const _getActiveGameById = async (
  endpoint: string
): Promise<NodotsGameActive> => {
  const result = await fetch(endpoint)
  return result.json()
}
export const _startGame = async (player1Id: string, player2Id: string) => {
  const result = await fetch(`${apiUrl}/game`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ player1Id, player2Id }),
  })
  const game = (await result.json()) as GameInitialized

  console.log('[useNodotsGame] _startGame game:', game)
  if (game) {
    sessionStorage.setItem('gameId', game.id)
    return game
  } else {
    throw Error('Game not started')
  }
}
export const _updatePlayerLocale = async (
  id: string,
  locale: NodotsLocaleCode
) => {
  console.log(id, locale)

  // fetch(endpoint, {
  //   method: 'PATCH',
  // })
}
const _rollForStart = async (
  game: GameInitialized,
  endpoint: string
): Promise<GamePlayingRolling> => {
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  })
  return result.json()
}
export const _roll = async (
  game: GamePlayingRolling,
  endpoint: string
): Promise<GamePlayingMoving> => {
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  })
  return result.json()
}
export const _switchDice = async (
  game: GamePlayingRolling,
  endpoint: string
): Promise<GamePlayingRolling> => {
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  })
  return result.json()
}
export const _double = async (
  game: GamePlayingRolling,
  endpoint: string
): Promise<GamePlayingMoving> => {
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  })
  return result.json()
}
export const _getPlayerGames = async (
  endpoint: string
): Promise<NodotsGame> => {
  console.log('[useNodotsGame] _getPlayerGames endpoint:', endpoint)
  const result = await fetch(endpoint)

  console.log('[useNodotsGame] _getPlayerGames result:', result)
  return result.json()
}
export const _getPlayersSeekingGame = async (
  endpoint: string
): Promise<PlayerSeekingGame[]> => {
  const result = await fetch(endpoint)
  return result.json()
}
export const _getPlayerForEmail = async (
  endpoint: string
): Promise<NodotsPlayer | null> => {
  const result = await fetch(endpoint)
  return result.json()
}
export const _getPlayerById = async (
  endpoint: string
): Promise<NodotsPlayer> => {
  const result = await fetch(endpoint)
  return result.json()
}
export const _getPlayerForAuth0Sub = async (
  endpoint: string
): Promise<NodotsPlayer | null> => {
  const result = await fetch(endpoint)
  return result.json()
}
export const _getPlayOffers = async (
  endpoint: string
): Promise<NodotsOfferPlay[]> => {
  const result = await fetch(endpoint)
  return result.json()
}
const _move = (
  state: GamePlayingRolling | GamePlayingMoving,
  checkerId: string,
  endpoint: string
): NodotsGame => {
  console.log(checkerId)
  return state
}
