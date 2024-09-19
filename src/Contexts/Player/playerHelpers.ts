import { Player, PlayerReady } from '../../../nodots_modules/backgammon-types'
import { apiUrl } from '../../App'

export const getPlayers = async (): Promise<Player[]> => {
  const result = await fetch(`${apiUrl}/player`)
  return result.json()
}

export const getPlayerById = async (id: string): Promise<Player> => {
  const result = await fetch(`${apiUrl}/player/${id}`)
  return result.json()
}

export const getPlayerBySub = async (sub: string): Promise<Player> => {
  console.log('[playerHelpers] getPlayerBySub sub:', sub)
  const [source, externalId] = sub.split('|')
  const endpoint = `${apiUrl}/player/sub/${source}/${externalId}`
  const result = await fetch(endpoint)
  const player = await result.json()
  console.log('[playerHelpers] getPlayerBySub player:', player)
  return player
}

export const addPlayer = async (player: Player): Promise<Player> => {
  const result = await fetch(`${apiUrl}/player`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(player),
  })
  return result.json()
}
